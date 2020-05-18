import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';


function FilterControls(props) {
    return (
        <div>
            <input name="nameFilter" type="text" value={props.filter} onChange={(e) => props.onFilterChange(e)}/>

            <label>Only failed
                <input name="showOnlyFailed" type="checkbox" checked={props.showOnlyFailed}
                       onChange={(e) => props.onOnlyFailedChange(e)}/>
            </label>
        </div>
    );
}

FilterControls.propTypes = {
    filter: PropTypes.string,
    showOnlyFailed: PropTypes.bool,
    onFilterChange: PropTypes.func,
    onOnlyFailedChange: PropTypes.func
};

/**
 * @return {null}
 */
function BuildLog(props) {
    const selected = props.selected;
    const build = props.builds.find(build => build.id === selected);
    if (build && build.log) {
        return (
            <div className="build-log preformatted">{build.log}</div>
        );
    } else {
        return null;
    }
}

function BuildRow(props) {

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

function BuildList(props) {
    const builds = props.builds;
    const buildList = builds.map((build) =>
        <BuildRow key={build.id} build={build} onClick={() => props.onClick(build.id)}/>,
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

function convertToDisplay(data) {
    return data.map(function (build) {
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        const date = new Date(build.time * 1000);
        const timestamp = date.toLocaleDateString('sv-SE', options) + " " + date.toLocaleTimeString('sv-SE');

        build.durationSeconds = build.duration / 1000;

        build.name = build.trigger.name;
        build.timestamp = timestamp;
        return build;
    });
}


function App(props) {
    const [builds, setBuilds] = useState([]);
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState("");
    const [onlyFailed, setOnlyFailed] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8081/builds')
            .then(response => response.json())
            .then(data => setBuilds(convertToDisplay(data)))
    },[]);


    let buildList = builds;

    if (onlyFailed) {
        buildList = buildList.filter((build) => build.status === "FAILED")
    }

    if (filter) {
        buildList = buildList.filter((build) => build.name.includes(filter))
    }

    return (
        <div className="app">
            <FilterControls showOnlyFailed={onlyFailed}
                            filter={filter}
                            onFilterChange={(e) => setFilter(e.target.value)}
                            onOnlyFailedChange={(e) => setOnlyFailed(e.target.checked)}/>
                            
            <div className="builds">
                <BuildList builds={buildList} onClick={(i) => setSelected(i)}/>
                <BuildLog builds={buildList} selected={selected}/>
            </div>
        </div>
    );

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
