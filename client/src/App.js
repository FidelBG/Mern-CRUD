import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      img:'',
      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  scrollToTop = () => {
    this.messagesTop.scrollIntoView({ behavior: "smooth" });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          img:this.state.img
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Task Updated'});
          this.setState({_id: '', title: '', description: '', img: ''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Task Saved'});
          this.setState({title: '', description: '', img: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) {
    if(window.confirm('Are you sure you want to delete it?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
         // window.M.toast({html: 'Task deleted'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          img: data.img,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchTasks();
  }
  
  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
     
        this.setState({tasks: data });
        
        this.state.tasks.sort((a, b) => parseFloat(a._id) - parseFloat(b._id));
        this.scrollToTop();
        //console.log(this.state.tasks);
      });
  }
  
  render() {
    
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="waves-effect waves-light  teal lighten-1">
          <div className="container">
            <div className="nav-wrapper offset-s3">
              <a href="/" className="brand-logo">MERN Stack CRUD</a>
            </div>
          </div>
       
        </nav>
       
      <div className="container">
        
        
        <div className="row">
            <div className="col s10 ">
              
             {
               
               this.state.tasks.map(task => {
                return (
 
            <div className="card"  key={task._id}>
                  <div className="card-image">
                      <img src={task.img} alt="images/sample-1.jpg"></img>
                      <span className="card-title">{task.title}</span>
                  </div>
                  <div className="card-content">
                      <p>{task.description}</p>
                  </div>
                  <div className="card-action">
                      <button onClick={() => this.deleteTask(task._id)} className="waves-effect waves-light btn-small">
                          <i className="material-icons">delete</i> 
                      </button>
                      <button onClick={() => this.editTask(task._id)} className="waves-effect waves-light btn-small" style={{margin: '4px'}}>
                          <i className="material-icons">edit</i>
                      </button>
                      <button onClick={() => this.scrollToTop()} className="waves-effect waves-light btn-small right" style={{margin: '4px'}}>
                          <i className="material-icons">add</i>
                      </button>
                  </div>
                  </div>
              
            
          )
        })
          }
            </div>
            </div>
          <div className="row">
          <div style={{ float:"left", clear: "both" }}
            
            ref={(el) => { this.messagesTop = el; }}>
            
            </div>
            <div className="col s10 ">

              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Title" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="img" onChange={this.handleChange} value={this.state.img} type="text" placeholder="Image URL" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Description" className="materialize-textarea"></textarea>
                      </div>
                    
                    </div>

                    <button type="submit" className="btn waves-effect waves-light right">
                    <i className="material-icons left">send</i> 
                    </button>
                  </form>
                </div>
                </div>
                    
              </div>
            </div>
          </div>
        
        </div>
       

     
    )
  }
}

export default App;