import React, {Component} from 'react';
import {FaTimes} from 'react-icons/fa';
import Moment from 'react-moment'


class ListAppointment extends Component{
    render() {
        
        // const listItems =this.props.Appoint.map(item =>(
        //     <div>
        //         <div>{item.petName}</div>
        //         <div>{item.ownerName}</div>
        //     </div>
        // ))
        return (
        // <div>{listItems}</div>

        <div className="appointment-list item-list mb-3">
            {this.props.Appoint.map(item => (
            <div className="pet-item col media py-3" key = {item.aptId}>
            <div className="mr-3">
                <button className="pet-delete btn btn-sm btn-danger"
                    onClick={()=> this.props.deleteAppointment(item)}>
                <FaTimes/></button>
            </div>

            <div className="pet-info media-body">
                <div className="pet-head d-flex">
                <span className="pet-name">{item.petName}</span>
                <span className="apt-date ml-auto">
                    <Moment 
                        date = {item.aptDate}
                        parse = "YYYY-MM-DD hh:mm"
                        format = "MM-D h:mma"
                    />
                </span>
                </div> 

                <div className="owner-name">
                <span className="label-item">Owner: {item.ownerName} </span>
                {/* <span>ownerName</span> */}
                </div>
                <div className="apt-notes">aptNotes:
                </div>
            </div>
            </div>
            ))}
            
    </div>
        )
    }
}

export default ListAppointment