import React, { PureComponent } from 'react'
import './Pagination.css';
import uuid from 'react-uuid';


export class Pagination extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            paginationNumber: [1, 2, 3, 4, 5],
            currentlyClickedNumber: 1,
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    shiftPagination = (e) => {
        e.preventDefault()
        this.scrollToTop()
        this.setState(prevState => ({
            paginationNumber: prevState.paginationNumber.map(num => num + 1),
            currentlyClickedNumber: prevState.currentlyClickedNumber + 1
        }))
        this.props.fetchData(undefined, this.state.currentlyClickedNumber + 1)
    }
    prevPagination = (e) => {
        e.preventDefault()
        this.scrollToTop()
        this.props.fetchData(undefined, this.state.currentlyClickedNumber - 1)
        this.setState(prevState => ({
            paginationNumber: prevState.paginationNumber.map(num => num - 1),
            currentlyClickedNumber: prevState.currentlyClickedNumber - 1
        }))
    }
    handlePagination = (e) => {
        this.scrollToTop()
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
                {this.props.movies.length ? <footer>
                    <div className="pagi-list">
                        {this.state.paginationNumber[0] - 1 <= 0 ? null :
                            <a onClick={(e) => this.prevPagination(e)}>«</a>}
                        {this.state.paginationNumber.map(paginationNumber => {
                            return <a
                                key={uuid()}
                                className={paginationNumber === this.state.currentlyClickedNumber ? 'active' : ''}
                                onClick={(e) => this.handlePagination(e)}>{paginationNumber}</a>
                        })}
                        {this.state.currentlyClickedNumber + 1 > lastPageNumber ? null :
                            <a onClick={(e) => this.shiftPagination(e)}>»</a>}
                    </div>
                </footer> : null}
            </React.Fragment >
        )
    }
}

export default Pagination
