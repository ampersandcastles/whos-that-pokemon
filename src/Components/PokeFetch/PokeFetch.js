import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends Component {
	constructor() {
		super();
		this.state = {
			pokeInfo: "",
			pokeSprite: "",
			pokeName: "",
			countdown: 10,
		};
	}

	fetchPokemon() {
		let min = Math.ceil(1);
		let max = Math.floor(152);
		let pokeNum = Math.floor(Math.random() * (max - min) + min);
		fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					pokeInfo: res,
					pokeSprite: res.sprites.front_default,
					pokeName: res.species.name,
				});
			})
			.catch((err) => console.log(err));
	}

	clock() {
		if (this.state.countdown <= 0);
		this.setState({
			countdown: this.state.countdown - 1,
		});
		if (this.state.countdown < 1) {
			clearInterval(this.interval);
		}
	}

	componentWillUpdate() {
		clearInterval(this.interval);
	}

	componentDidUpdate() {
		this.interval = setInterval(this.clock.bind(this), 1000);
	}

	resetState = () => {
		this.setState({ countdown: 10 });
	};

	render() {
		return (
			<div className={"wrapper"}>
				<button
					className={"start"}
					onClick={() => {
						this.resetState();
						this.fetchPokemon();
					}}
				>
					Start!
				</button>
				<h1 className={"timer"}>Timer Display</h1>
				<h2 className={"countdown"}>{this.state.countdown}</h2>
				<div className={"pokeWrap"}>
					<img
						className={"pokeImg"}
						src={this.state.pokeSprite}
						style={
							this.state.countdown === 0
								? { filter: "brightness(100%)" }
								: { filter: "brightness(0%)" }
						}
						alt={this.state.pokeName}
					/>
					<h1
						className={"pokeName"}
						style={
							this.state.countdown === 0 ? { opacity: "1" } : { opacity: "0" }
						}
					>
						{this.state.pokeName}
					</h1>
				</div>
			</div>
		);
	}
}

export default PokeFetch;
