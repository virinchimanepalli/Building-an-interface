import React from 'react'
import '../App.css'
import AddAppointment from './AddAppointment';
import ListAppointment from './ListAppointment';
import SearchAppointment from './SearchAppointment';

import {findIndex, without} from 'lodash';

class Sample extends React.Component{
    constructor(){
        super();
        this.state = {
            myName: 'Ray',
            myAppointments: [],
            formDisplay: false,
            lastIndex: 0,
            queryText: '',
            orderBy: 'petName',
            orderDir: 'asc'
        }
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.toggleForm =this.toggleForm.bind(this)
        this.addAppointment =this.addAppointment.bind(this)
        this.changeOrder = this.changeOrder.bind(this)
        this.searchApts = this.searchApts.bind(this)
        this.updateInfo = this.updateInfo.bind(this);
    }

    deleteAppointment(apt) {
        let tempApts = this.state.myAppointments;
        tempApts = without(tempApts, apt);
    
        this.setState({
          myAppointments: tempApts
        });
      }

      addAppointment(apt){
          let tempApts = this.state.myAppointments;
          apt.aptId = this.state.lastIndex
          tempApts.unshift(apt);
          this.setState({
              myAppointments: tempApts,
              lastIndex: this.state.lastIndex + 1
          })


      }

      searchApts(query){
        this.setState({
            queryText: query
        })
      }


      changeOrder(order, dir) {
        this.setState({
          orderBy: order,
          orderDir: dir
        });
      }

      updateInfo(name, value, id) {
        let tempApts = this.state.myAppointments;
        let aptIndex = findIndex(this.state.myAppointments, {
          aptId: id
        });
        tempApts[aptIndex][name] = value;
        this.setState({
          myAppointments: tempApts
        });
      }

      toggleForm(){
          this.setState({
              formDisplay: !this.state.formDisplay

          })
      }


    componentDidMount(){
        fetch('./data.json')
            .then(response => response.json())
            .then(result => {
                const apts = result.map(items =>{
                    items.aptId = this.state.lastIndex
                    this.setState({lastIndex: this.state.lastIndex + 1})
                    return items
                })
                this.setState({
                    myAppointments: apts
                })
            })
           
    }


    render(){
        let order;
        let filteredApts = this.state.myAppointments;
        if (this.state.orderDir === 'asc'){
            order = 1;
        }
        else{
            order = -1
        }
        filteredApts = filteredApts.sort((a,b) => {
            if (a[this.state.orderBy].toLowerCase()<
                b[this.state.orderBy].toLowerCase())
                {
                    return -1*order;
                }
                else{
                    return 1*order;
                }
        }

        )
        .filter(eachItem => {
            return (
              eachItem['petName']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase()) ||
              eachItem['ownerName']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase()) ||
              eachItem['aptNotes']
                .toLowerCase()
                .includes(this.state.queryText.toLowerCase())
            );
          });
        return(
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                              
                                <AddAppointment formDisplay={this.state.formDisplay}
                                toggleForm={this.toggleForm}   
                                addAppointment= {this.addAppointment} />

                                <SearchAppointment  
                                 changeOrder={this.changeOrder}
                                 orderBy = {this.state.orderBy}   
                                 orderDir = {this.state.orderDir}
                                 searchApts ={this.searchApts}
                                 />

                                <ListAppointment   
                                Appoint={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}/>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Sample