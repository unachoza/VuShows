
import React, {Component} from 'react'
import axios from 'axios'

//const { 43caac628b4f73785a588143ec291dbe} = process.env
const API_URL = 'https://api.themoviedb.org/3/search/tv'


class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            query: '',
            results: [],
            show: false,
        } 
        this.handleSubmit = this.handleSubmit.bind(this)
    }

   

    handleInput = async(e) => {
      await this.setState({
           query: e.target.value
       })
    }


    handleSubmit(e){
        e.preventDefault()
        console.log(this.state.query)
        this.props.getInfo()
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
            </form>
        )
    }
}

export default Search 

