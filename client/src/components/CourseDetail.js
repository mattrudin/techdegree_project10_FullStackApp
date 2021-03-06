import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { getCourseWithID } from '../utility/CRUD'
import ActionBar from './ActionBar'


export default class CourseDetail extends Component {
    state = {
        data: [],
        user: [],
        courseID: null,
    }

    // At component mounting: Fetch all details from the course
    async componentDidMount() {
        const { match } = this.props
        const courseID = match.params.id
        try {
            const data = await getCourseWithID(courseID)
            const { user } = data
            this.setState({
                data,
                user,
                courseID,
            })
        } catch (error) {
            console.log('An error occured while fetching data: ', error)
        }
    }

    render() {
        const { title, description, estimatedTime, materialsNeeded } = this.state.data
        const { firstName, lastName } = this.state.user
        
        return (
            <div>
                <ActionBar data={this.state} />
                <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{title}</h3>
                    <p>By {firstName} {lastName}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={description} />
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
                            <ReactMarkdown source={materialsNeeded} />
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
