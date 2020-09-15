import React from 'react'
import '../App.css'
import AddAppointment from './AddAppointment';
import ListAppointment from './ListAppointment';
import SearchAppointment from './SearchAppointment';

class Sample extends React.Component{
    constructor(){
        super();
        this.state = {
            myName: 'Ray',
            myAppointments: [],
            lastIndex: 0
        }
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

        const listItems =this.state.myAppointments.map(item =>(
            <div>
                <div>{item.petName}</div>
                <div>{item.ownerName}</div>
            </div>
        ))

        return(
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                {/* <div>Add appointments</div> */}
                                {this.state.myName}
                                {/* {listItems} */}
                                <AddAppointment />
                                <ListAppointment Appoint = {this.state.myAppointments}/>
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