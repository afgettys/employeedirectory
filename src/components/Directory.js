import React, { Component } from "react";
import Container from "./Container";
import Trow from "./Trow";
import SearchBar from "./Search";
import "../styles.css";

import moment from "moment";

let filtered = false;
// let started = false;

class Directory extends Component {
	state = {
		result: [],
		filteredResult: [],
    search: "",
    // started: false
	};

	// getStarted = () => {
    // this.setState({ started: true });
    // started = true;
	// };
  
	componentDidMount() {
    this.randomPerson();
		// this.getStarted();
	}

	randomPerson = () => {
		fetch("https://randomuser.me/api/?results=25")
			.then(res => res.json())
			.then(response => {
				console.log("response", response);
				this.setState({ result: response.results });
			});
	};

	globalSearch = () => {
		let { search, result } = this.state;
		console.log("search", search);
		console.log("before result", result);
		let filteredResult = result.filter(value => {
			return (
				value.name.first.toLowerCase().includes(search.toLowerCase()) ||
				value.name.last.toLowerCase().includes(search.toLowerCase()) ||
				value.email.toLowerCase().includes(search.toLowerCase())
			);
		});
		this.setState({ filteredResult });
		console.log("filtered result", filteredResult);
	};

	handleChange = event => {
		this.setState({ search: event.target.value }, () => {
			this.globalSearch();
			filtered = true;
		});
	};

	formatBD = str => {
		const newDate = moment(str).format("LL");
		// console.log("newDate", newDate);
		return newDate;
	};

	render() {
		// ternary
		// console.log("started", this.state.started);
		return (
			<div className="container">		
					<Container>
						<div className="jumbotron text-center">
							<h1 className="display-4">Employee Directory</h1>
							<p className="lead">
							 To find someone specific,simply type{" "}
								<br /> their name or email in the search bellow.
							</p>
							<hr className="my-4" />
							<SearchBar
								name="search"
								value={this.state.search || ""}
								onChange={this.handleChange}
								label="Search"
							/>
						</div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Photo</th>
									<th scope="col">Name</th>
									<th scope="col">Email</th>
									<th scope="col">Phone #</th>
									<th scope="col">Birthdate</th>
								</tr>
							</thead>
							<tbody>
								{!filtered
									? this.state.result.map(person => (
											<Trow
												key={person.login.uuid}
												firstName={person.name.first}
												lastName={person.name.last}
												src={person.picture.thumbnail}
												email={person.email}
												phone={person.cell}
												birthdate={this.formatBD(person.dob.date)}
											/>
									  ))
									: this.state.filteredResult.map(person => (
											<Trow
												key={person.login.uuid}
												firstName={person.name.first}
												lastName={person.name.last}
												src={person.picture.thumbnail}
												email={person.email}
												phone={person.cell}
												birthdate={this.formatBD(person.dob.date)}
											/>
									  ))}
							</tbody>
						</table>
					</Container>
				{/* )} */}
			</div>
		);
	}
}

export default Directory;