import React from 'react';
import ReactDOM from 'react-dom';
import { mockBuilds } from './test-data';
import './index.css';



function FilterControls(props) {
			return (
				<form>
          <input name="filterName" type="text" value={props.filter.filterName} onChange={(e) => props.onChange(e)} />

					<label>Only failed
						<input name="showOnlyFailed" type="checkbox" checked={props.filter.showOnlyFailed} onChange={(e) => props.onChange(e)} />
					</label>
				</form>
    	);
}

function BuildLog(props) {
  const selected = props.selected;
  const build = props.builds.find(build => build.id === selected);
  if(build && build.log){
    return (
      <div className="build-log preformatted">{build.log}</div> 
    );
  }
  else {
    return null;
  }
}

function BuildRow(props){

	  const build = props.build;

    return (
		<tr onClick={props.onClick}>
			<td>{build.timestamp}</td>
			<td>{build.name}</td>
			<td>{build.durationSeconds}s</td>
			<td>{build.status}</td>
		</tr>
    );
}

function BuildList(props){
    const builds = props.builds;
    const buildList = builds.map((build) => 
        <BuildRow key={build.id} build={build} onClick={() => props.onClick(build.id)} />,
    ).reverse();

    return (
     	<div className="build-list">
     	 <table>
     	   <thead>
     	     <tr>
     	       <th>Time</th>
     	       <th>Name</th>
     	       <th>Duration</th>
     	       <th>Status</th>
     	     </tr>
     	   </thead>
     	   <tbody>{buildList}</tbody>
     	 </table>
     	</div>
    );
}

function convertToDisplay(data){
  return data.map(function(build){
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(build.time * 1000);
    const timestamp = date.toLocaleDateString('sv-SE', options) + " "+ date.toLocaleTimeString('sv-SE');

	  build.durationSeconds = build.duration / 1000;

    build.name = build.trigger.name
    build.timestamp = timestamp
    return build;
  });
}
 

class App extends React.Component {
   constructor(props){
       super(props);
       this.state = {
           selected: null,
           error: null,
           isLoaded: false,
           builds: [],
					 showOnlyFailed: false,
					 nameFilter: null
       }
   }
  componentDidMount() {
    this.interval = setInterval(() => 

      fetch('http://localhost:8081/builds')
      .then(response => response.json())
      .then(data => this.setState({ builds: convertToDisplay(data) }))
      ,1000);
  }
 
   componentWillUnmount() {
    clearInterval(this.interval);
   }

   setSelected(buildId){
       this.setState({
           selected: buildId,
       });
   }


	 setFilter(event){
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
			const name = target.name;

      this.setState({
        [name]: value
      });
	 }

   render(){
        var buildList;
        if(!this.state.showOnlyFailed || this.nameFilter){
          buildList = this.state.builds;
        }
        else {
				  buildList = this.state.builds.filter((build) => 
																(!this.state.filterName || build.name.includes(this.state.filterName))
																&& (!this.state.showOnlyFailed || build.status === "FAILED"))
        }

				const filter = {
								showOnlyFailed : this.state.showOnlyFailed,
								nameFilter : this.state.nameFilter
							};
				
        return (
            <div className="app">
		 						<FilterControls filter={filter} onChange={(e) => this.setFilter(e)} />
								<div className="builds">
                <BuildList builds={buildList} onClick={(i) => this.setSelected(i)} />
                <BuildLog builds={buildList} selected={this.state.selected} />
								</div>
            </div>
        );
   }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
