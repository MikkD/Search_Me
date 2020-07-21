import React, { PureComponent } from 'react'
import './Pagination.css'

export class Pagination extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            paginationNumber: [1, 2, 3, 4, 5],
            currentlyClickedNumber: 1,
        }
    }

    shiftPagination = (e) => {
        e.preventDefault()
        this.setState(prevState => ({
            paginationNumber: prevState.paginationNumber.map(num => num + 1),
            currentlyClickedNumber: prevState.currentlyClickedNumber + 1
        }))
        this.props.fetchData(undefined, this.state.currentlyClickedNumber + 1)
    }
    prevPagination = (e) => {
        e.preventDefault()
        this.props.fetchData(undefined, this.state.currentlyClickedNumber - 1)
        this.setState(prevState => ({
            paginationNumber: prevState.paginationNumber.map(num => num - 1),
            currentlyClickedNumber: prevState.currentlyClickedNumber - 1
        }))
    }
    handlePagination = (e) => {
        const theNumber = parseInt(e.target.innerHTML)
        this.props.fetchData(undefined, theNumber)
        this.setState({ currentlyClickedNumber: theNumber })
    }


    render() {
        console.log('Pagination.js Trigerred')
        const { totalNumberOfPosters } = this.props;
        const lastPageNumber = Math.round(totalNumberOfPosters / 10)
        return (
            <React.Fragment>
                {/* <footer style={this.props.movies.length ? { display: 'block' } : { display: 'none' }}> */}
                {this.props.movies.length ? <footer>
                    <div className="pagi-list">
                        {this.state.paginationNumber[0] - 1 <= 0 ? null : <a onClick={(e) => this.prevPagination(e)}>«</a>}
                        {this.state.paginationNumber.map(paginationNumber => {
                            return <a className={paginationNumber === this.state.currentlyClickedNumber ? 'active' : ''}
                                onClick={(e) => this.handlePagination(e)}>{paginationNumber}</a>
                        })}
                        {this.state.currentlyClickedNumber + 1 > lastPageNumber ? null : <a onClick={(e) => this.shiftPagination(e)}>»</a>}
                    </div>
                </footer> : null}
                {/* </footer > */}
            </React.Fragment >
        )
    }
}

export default Pagination
