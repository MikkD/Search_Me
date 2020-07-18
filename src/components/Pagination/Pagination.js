import React, { Component } from 'react'
import './Pagination.css'

export class Pagination extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 1,
            isActive: true
        }
        this.handlePagination = this.handlePagination.bind(this)

    }

    handlePagination = (event) => {
        let pageNumber = parseInt(event.target.innerText);
        let inputValue = document.querySelector('#search-input').value;
        if (pageNumber > 0) {
            this.props.getMovies(inputValue, pageNumber)
            this.setState({ number: pageNumber, isActive: true })
        }
        // Handling pagi-arrows
        if (event.target.className == 'pagi-link-back-arrow') {
            this.props.getMovies(inputValue, this.state.number - 1)
            this.setState({ number: this.state.number - 1, isActive: true })
        }
        if (event.target.className == 'pagi-link-next-arrow') {
            this.props.getMovies(inputValue, this.state.number + 1)
            this.setState({ number: this.state.number + 1, isActive: true })
        }

    }

    render() {
        console.log('Pagination.js Trigerred')
        return (
            <React.Fragment>
                <footer style={this.props.currentMovies.length ? { display: 'block' } : { display: 'none' }}>
                    <div className="pagi-wrapper">
                        <div className="pagi-list" onClick={this.handlePagination.bind(this)}>
                            <li className="pagi-list-item"><a href="#" className="pagi-link-back-arrow">«</a></li>
                            <li className="pagi-list-item"><a href="#" className={this.state.isActive && this.state.number === 1 ? "pagi-link active" : "pagi-link"}>1</a></li>
                            <li className="pagi-list-item"><a href="#" className={this.state.isActive && this.state.number === 2 ? "pagi-link active" : "pagi-link"}>2</a></li>
                            <li className="pagi-list-item"><a href="#" className={this.state.isActive && this.state.number === 3 ? "pagi-link active" : "pagi-link"}>3</a></li>
                            <li className="pagi-list-item"><a href="#" className={this.state.isActive && this.state.number === 4 ? "pagi-link active" : "pagi-link"}>4</a></li>
                            <li className="pagi-list-item"><a href="#" className={this.state.isActive && this.state.number === 5 ? "pagi-link active" : "pagi-link"}>5</a></li>
                            <li className="pagi-list-item"><a href="#" className="pagi-link-next-arrow">»</a></li>
                        </div>
                    </div >
                </footer >
            </React.Fragment >
        )
    }
}

export default Pagination
