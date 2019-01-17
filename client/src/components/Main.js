import React  from "react";

export default class Main extends React.Component {
	constructor(props){
		super(props);
		this.state={
			users:[],
			name:"",
			email:"",
			gender:"female",
			phone:"",
			dob:"",
			error:false
		}
		this.handleUploadUser = this.handleUploadUser.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handleGender = this.handleGender.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePhone = this.handlePhone.bind(this);
		this.handleDate = this.handleDate.bind(this);
	}
	handleDate(e){
		e.preventDefault();
		const dob = e.target.value;
		this.setState({dob});
	}
	handlePhone(e){
		e.preventDefault();
		const phone = e.target.value;
		this.setState({phone});
	}
	handleEmail(e){
		e.preventDefault();
		const email = e.target.value;
		this.setState({email});
	}
	handleGender(e){
		const gender = e.currentTarget.value;
		this.setState({gender})
	}
	handleName(e){
		e.preventDefault();
		const name = e.target.name.value;
		this.setState({name});
	}
	getAllUsers(){
		fetch('/user',{
			method: 'GET'
		}).then(respo=>{
			//console.log("respo",respo.json());
			return respo.json().then(body=>{
				this.setState({users:body});
			})
		})
	}
	componentDidMount(){
		this.getAllUsers();
	}
	handleUploadUser(e){
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const gender = e.target.gender.value;
		const phone = e.target.phone.value;
		const date = e.target.date.value;
		if(name && gender && phone && date && email){
			this.setState({name:'',email:'',phone:'',gender:'',dob:'',error:false});
			fetch('/add_user', {
			method: 'POST',
			body: JSON.stringify({"name":name,email,gender,phone,date}),
			headers: {"Content-Type": "application/json"}
			}).then(response => {
				if(response.status==200){
					this.getAllUsers();
				}
			});
		}
		else{
			this.setState({name:'',email:'',phone:'',gender:'',dob:'',error:true});
		}	
	}
	render(){
		return(
			<div>
			{this.state.error ? <p>Please provide all the details</p>:""}
			<h3>Add User</h3>
			<form action="/add_user" method="post" onSubmit={this.handleUploadUser}>
			   Name:&nbsp;
			   <input type="text" name="name" value={this.state.name} onChange={this.handleName}/><br/><br/>
			   Email:&nbsp;
			  <input type="email" name="email"  value={this.state.email} onChange={this.handleEmail}/><br/><br/>
			  	Gender:&nbsp;
				<input type="radio" name="gender" value="male" onChange={this.handleGender} checked={this.state.gender==="male"}/> Male&nbsp;
				<input type="radio" name="gender" value="female" onChange={this.handleGender} checked={this.state.gender==="female"}/> Female<br/><br/>
				Phone number:&nbsp;
				<input type="number" name="phone" value={this.state.phone} onChange={this.handlePhone}/><br/><br/>
				DOB:&nbsp;
				<input type="date" name="date" value={this.state.dob} onChange={this.handleDate}/><br/><br/>
			  <input type="submit" value="Submit"/>
			</form>
			<hr/>
			<h3>Users List</h3>
			<div>
				<table id="tableId">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Phone</th>
						<th>DoB</th>
					</tr>
				</thead>
				<tbody>
					{this.state.users.map(function (user) {
					return <tr><td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.gender}</td>
					<td>{user.phone}</td>
					<td>{user.dob}</td>
					</tr>
					})}
				</tbody>
				</table>

			</div>
			</div>
		)
	}
}