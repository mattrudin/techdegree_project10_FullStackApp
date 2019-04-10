import React, { Component } from 'react'
import fetchData from '../utility/fetchData'
import URL from '../ressources/URL'
import ActionBar from './ActionBar'


export default class CourseDetail extends Component {
    state = {
        data: [],
        user: []
    }

    async componentDidMount() {
        // TODO / Attention: Hardcoded id!
        const HARDCODEDid = '57029ed4795118be119cc441'
        const url = `${URL.getCourseWithID}${HARDCODEDid}`
        const data = await fetchData(url)
        const { user } = data
        this.setState({
            data,
            user
        })
    }

    render() {
        const { title, description, estimatedTime, materialsNeeded } = this.state.data
        const { firstName, lastName } = this.state.user
        
        return (
        <div>
            <ActionBar />
            <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>By {firstName} {lastName}</p>
                </div>
                <div className="course--description">
                <p>{description}</p>
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                        <li>1/2 x 3/4 inch parting strip</li>
                        <li>1 x 2 common pine</li>
                        <li>1 x 4 common pine</li>
                        <li>1 x 10 common pine</li>
                        <li>1/4 inch thick lauan plywood</li>
                        <li>Finishing Nails</li>
                        <li>Sandpaper</li>
                        <li>Wood Glue</li>
                        <li>Wood Filler</li>
                        <li>Minwax Oil Based Polyurethane</li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        )
    }
}
