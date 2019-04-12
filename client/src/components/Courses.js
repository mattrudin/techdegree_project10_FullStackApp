import React, { Component } from 'react'
import fetchData from '../utility/fetchData'
import URL from '../ressources/URL'
import NewCourseButton from './NewCourseButton'

export default class Courses extends Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const data = await fetchData(URL.getAllCourses)
        this.setState({
            data
        })
    }

    render() {
        return (
            <div className="bounds">
                {this.state.data && this.state.data.map(course => (
                    <article  key={course._id} className="grid-33"><a className="course--module course--link" href="course-detail.html">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{course.title}</h3>
                        </a>
                    </article>
                ))}
                <NewCourseButton />
            </div>
        )
    }
}
