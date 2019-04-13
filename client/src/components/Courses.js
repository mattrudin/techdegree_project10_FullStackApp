import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../utility/CRUD'
import NewCourseButton from './NewCourseButton'

export default class Courses extends Component {
    state = {
        data: []
    }

    async componentDidMount() {
        const data = await getAllCourses()
        this.setState({
            data
        })
    }

    render() {
        return (
            <div className="bounds">
                {this.state.data && this.state.data.map(course => (
                    <article  key={course._id} className="grid-33">
                        <Link className="course--module course--link" to={`/courses/${course._id}`} >
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </article>
                ))}
                <NewCourseButton />
            </div>
        )
    }
}
