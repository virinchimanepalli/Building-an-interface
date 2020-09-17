import React from 'react'
import '../App.css'
import AddAppointment from './AddAppointment';
import ListAppointment from './ListAppointment';
import SearchAppointment from './SearchAppointment';

import {without} from 'lodash';

class Sample extends React.Component{
    constructor(){
        super();
        this.state = {
            myName: 'Ray',
            myAppointments: [],
            formDisplay: false,
            lastIndex: 0
        }
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.toggleForm =this.toggleForm.bind(this)
        this.addAppointment =this.addAppointment.bind(this)
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

        // const listItems =this.state.myAppointments.map(item =>(
        //     <div>
        //         <div>{item.petName}</div>
        //         <div>{item.ownerName}</div>
        //     </div>
        // ))

        return(
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                {/* <div>Add appointments</div> */}
                                {/* {this.state.myName} */}
                                {/* {listItems} */}
                                <AddAppointment formDisplay={this.state.formDisplay}
                                toggleForm={this.toggleForm}   
                                addAppointment= {this.addAppointment} />
                                <ListAppointment   
                                Appoint={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment}/>
                                <SearchAppointment/>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Sample