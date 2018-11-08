import React, {Component} from 'react'
import Suggestions from './Suggestions'
import axios from 'axios'

//const { 43caac628b4f73785a588143ec291dbe} = process.env
const API_URL = 'https://api.themoviedb.org/3/search/tv'


class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            query: '',
            results: []
        } 
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getInfo() {
        //axios.get(`${API_URL}?api_key=${API_KEY}&prefix=${this.state.query}&limit=7`)
        console.log('hello')
        axios.get(`${API_URL}?api_key=43caac628b4f73785a588143ec291dbe&language=en-US&query=${this.state.query}&page=1`)
        .then((data) => {
            console.log(data)
            this.setState({
                results: data.data.results
            })
            console.log(this.state.results)
        })
        .then(() => console.log(this.state.results))
    }

    handleInput = async(e) => {
      await this.setState({
           query: e.target.value
       })
    }


    handleSubmit(e){
        e.preventDefault()
        console.log(this.state.query)
        this.getInfo()
        console.log('I was clicked')

    }
    
    render(){
        return(
            <form
            onSubmit={this.handleSubmit}
            >
                Search
                <input
                placeholder= "Search Tv Show"
                ref={input => this.search = input}
                onChange={this.handleInput}
                ></input>
               <input type = 'submit'
                value = 'submit'
               />
                <Suggestions results={this.state.results} />
            </form>
        )
    }
}

export default Search 