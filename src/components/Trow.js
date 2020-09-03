import React from "react";

function Trow(props) {
	return (
		<tr>
			<td>
				<img
					alt={props.firstName}
					className="img-fluid"
					src={props.src}
					style={{ margin: "0 auto" }}
				/>
			</td>
			<td>{`${props.firstName} ${props.lastName}`}</td>
			<td>{props.email}</td>
			<td>{props.phone}</td>
			<td>{props.birthdate}</td>
		</tr>
	);
}

export default Trow;