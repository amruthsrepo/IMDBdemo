import React, { Component } from 'react'
import Spinner from '../components/spinner'
import Axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

// var $ = require("jquery")

const baseurl = 'http://localhost:5000/api/'

export default class Disp extends Component {
    state = {
        load: 'true',
        movlist: '',
        actlist: '',
        prolist: '',
        view: 'mov'
    }

    render() {
        const { load } = this.state
        const { view } = this.state
        if (load === 'true') {
            return (
                <React.Fragment>
                    <div className="container-fluid" style={{ paddingTop: '1%' }}>
                        <div className='row justify-content-around'>
                            <button className="btn btn-outline-warning btn-sm" disabled type="button" onClick={this.showmov.bind(this)}>Movies list</button>
                            <button className="btn btn-outline-warning btn-sm" disabled type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-outline-warning btn-sm" disabled type="button" onClick={this.showpro.bind(this)}>Producers list</button>
                        </div>
                        <div className='row justify-content-around' style={{ paddingTop: '1%' }}>
                            <Spinner />
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        else if (view === 'mov') {
            const { movlist } = this.state
            var movlen = Object.keys(movlist).length
            var base64Flag = 'data:image/jpeg;base64,';
            const movcols = [{
                Header: 'Movie name',
                accessor: 'name',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.1),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Year',
                accessor: 'yor',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.1),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Producer',
                accessor: 'pro',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.1),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Plot',
                accessor: 'plot',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.6)
            }]
            return (
                <React.Fragment>
                    <div className="container-fluid" style={{ paddingTop: '1%' }}>
                        <div className='row justify-content-around'>
                            <button className="btn btn-warning btn-sm" type="button" onClick={this.showmov.bind(this)}>Movies list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showpro.bind(this)}>Producers list</button>
                        </div>
                        <div className='row justify-content-around' style={{ paddingTop: '1%' }}>
                            <ReactTable
                                className="-striped"
                                data={movlist}
                                columns={movcols}
                                defaultSorted={[{
                                    id: 'yor',
                                    desc: true,
                                }]}
                                defaultPageSize={movlen < 15 ? movlen : 13}
                                pageSizeOptions={(movlen < 30) ? [15, 20, movlen] : [15, 20, 30, movlen]}
                                SubComponent={row => {
                                    if(row.original['post']===undefined)    return
                                    const subcols = [{
                                        Header: 'Name',
                                        accessor: 'name',
                                        resizable: false,
                                        filterable: true,
                                        width: Math.round(window.innerWidth * 0.13),
                                        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                                    }, {
                                        Header: 'Sex',
                                        accessor: 'sex',
                                        resizable: false,
                                        filterable: true,
                                        width: Math.round(window.innerWidth * 0.13),
                                        Cell: row => <div style={{ textAlign: "center" }}>{(row.value === 'M') ? 'Male' : 'Female'}</div>
                                    }, {
                                        Header: 'DOB',
                                        accessor: 'dob',
                                        resizable: false,
                                        filterable: true,
                                        width: Math.round(window.innerWidth * 0.13),
                                        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                                    }, {
                                        Header: 'Bio',
                                        accessor: 'bio',
                                        resizable: false,
                                        filterable: true,
                                        width: Math.round(window.innerWidth * 0.2)
                                    }]
                                    return (
                                        <div className='container-fluid' style={{paddingTop:'1%', paddingBottom:'1%'}}>
                                            <div className='row justify-content-around'>
                                                <div className='col-sm-3'>
                                                    <h3>Poster</h3>
                                                    <img style={{
                                                        margin: '0px',
                                                        borderStyle: 'solid',
                                                        borderWidth: '2px',
                                                        borderRadius: '7px',
                                                        maxWidth: '200px',
                                                        maxHeight: '200px'
                                                        }} alt='poster'
                                                        src={base64Flag+this.arrayBufferToBase64(row.original['post']['data']['data'])}>
                                                    </img>
                                                </div>
                                                <div className='col-sm-7'>
                                                    <h3>Actors</h3>
                                                        <ReactTable
                                                            data = {row.original['act']}
                                                            columns = {subcols}
                                                            defaultPageSize = {Object.keys(row.original['act']).length}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        else if (view === 'act') {
            const { actlist } = this.state
            var actlen = Object.keys(actlist).length
            const actcols = [{
                Header: 'Name',
                accessor: 'name',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.2),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Sex',
                accessor: 'sex',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.2),
                Cell: row => <div style={{ textAlign: "center" }}>{(row.value === 'M') ? 'Male' : 'Female'}</div>
            }, {
                Header: 'DOB',
                accessor: 'dob',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.2),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Bio',
                accessor: 'bio',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.3)
            }]
            return (
                <React.Fragment>
                    <div className="container" style={{ paddingTop: '1%' }}>
                        <div className='row justify-content-around'>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showmov.bind(this)}>Movies list</button>
                            <button className="btn btn-warning btn-sm" type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showpro.bind(this)}>Producers list</button>
                        </div>
                        <div className='row justify-content-around' style={{ paddingTop: '1%' }}>
                            <ReactTable
                                className="-striped"
                                data={actlist}
                                columns={actcols}
                                defaultSorted={[{
                                    id: 'dob',
                                    desc: true,
                                }]}
                                defaultPageSize={actlen < 15 ? actlen : 13}
                                pageSizeOptions={(actlen < 30) ? [15, 20, actlen] : [15, 20, 30, actlen]}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        else if (view === 'pro') {
            const { prolist } = this.state
            var prolen = Object.keys(prolist).length
            const procols = [{
                Header: 'Name',
                accessor: 'name',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.2),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Sex',
                accessor: 'sex',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.2),
                Cell: row => <div style={{ textAlign: "center" }}>{(row.value === 'M') ? 'Male' : 'Female'}</div>
            }, {
                Header: 'DOB',
                accessor: 'dob',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.2),
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }, {
                Header: 'Bio',
                accessor: 'bio',
                resizable: false,
                filterable: true,
                width: Math.round(window.innerWidth * 0.3)
            }]
            return (
                <React.Fragment>
                    <div className="container" style={{ paddingTop: '1%' }}>
                        <div className='row justify-content-around'>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showmov.bind(this)}>Movies list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-warning btn-sm" type="button" onClick={this.showpro.bind(this)}>Producers list</button>
                        </div>
                        <div className='row justify-content-around' style={{ paddingTop: '1%' }}>
                            <ReactTable
                                className="-striped"
                                data={prolist}
                                columns={procols}
                                defaultSorted={[{
                                    id: 'dob',
                                    desc: true,
                                }]}
                                defaultPageSize={prolen < 15 ? prolen : 13}
                                pageSizeOptions={(prolen < 30) ? [15, 20, prolen] : [15, 20, 30, prolen]}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

    componentWillMount() {
        Axios.get(baseurl + 'getmov')
            .then(res => {
                console.log(res.data)
                this.setState({
                    movlist: res.data,
                    load: 'false'
                })
            })
    }

    showact() {
        this.setState({ load: 'true' })
        Axios.get(baseurl + 'getact')
            .then(res => {
                this.setState({
                    actlist: res.data,
                    load: 'false',
                    view: 'act'
                })
            })
    }

    showpro() {
        this.setState({ load: 'true' })
        Axios.get(baseurl + 'getpro')
            .then(res => {
                this.setState({
                    prolist: res.data,
                    load: 'false',
                    view: 'pro'
                })
            }
            )
    }

    showmov() {
        this.setState({ load: 'true' })
        Axios.get(baseurl + 'getmov')
            .then(res => {
                this.setState({
                    movlist: res.data,
                    load: 'false',
                    view: 'mov'
                })
            })
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

}
