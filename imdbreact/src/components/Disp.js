import React, { Component } from 'react'
import Spinner from '../components/spinner'
import Axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Basic from './Basic'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import $ from 'jquery'
import Select from 'react-select'


// var $ = require("jquery")

const baseurl = Basic.baseurl

export default class Disp extends Component {


    constructor(props, context) {
        super(props, context)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow(rowog) {

        this.setState({
            activeName : rowog.name,
            activeYor : rowog.yor,
            selectedPro : {label: rowog.pro, value: rowog.prod},
            selectedAct : rowog.act.map( function(nam) { return {label: nam['name'], value: nam['_id']} }),
            activePlot : rowog.plot,
            selectedFileID : rowog.poster,
            activeID : rowog['_id']
        })
        this.setState({ show: true });
        console.log(rowog)
    }

    state = {
        load: 'true',
        movlist: '',
        actlist: '',
        prolist: '',
        view: 'mov',
        show: false,
        activeName: '',
        activeID: '',
        activeYor: '',
        activePlot: '',
        selectedFile: null,
        selectedFileID: null,
        selectedPro: null,
        selectedAct: null
    }

    render() {
        const { load } = this.state
        const { view } = this.state
        if (load === 'true') {
            return (
                <React.Fragment>
                    <div className="container-fluid" style={{ paddingTop: '1%' }}>
                        <div className='row justify-content-around'>
                            <button className="btn btn-outline-warning btn-sm" disabled type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-outline-warning btn-sm" disabled type="button" onClick={this.showmov.bind(this)}>Movies list</button>
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
            const { selectedPro } = this.state
            const { selectedAct } = this.state
            var movlen = Object.keys(movlist).length
            var base64Flag = 'data:image/jpeg;base64,'
            var pronames = this.state.prolist.map(function (nam) {
                return { label: nam['name'], value: nam['_id'] }
            })
            var actnames = this.state.actlist.map(function (nam) {
                return { label: nam['name'], value: nam['_id'] }
            })
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
                Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
                sortMethod: (a, b) => {
                    a = parseInt(a);
                    b = parseInt(b);
                    return b < a ? 1 : -1;
                }
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
                    <div className="container-fluid" style={{ paddingTop: '1%', paddingBottom: '2%' }}>
                        <div className='row justify-content-around'>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-warning btn-sm" type="button" onClick={this.showmov.bind(this)}>Movies list</button>
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
                                    if (row.original['post'] === undefined) return
                                    var actlen = Object.keys(row.original['act'])
                                    var bufimg = base64Flag + this.arrayBufferToBase64(row.original['post']['data']['data'])
                                    const subcols = [{
                                        Header: 'Name',
                                        accessor: 'name',
                                        resizable: false,
                                        width: Math.round(window.innerWidth * 0.13),
                                        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                                    }, {
                                        Header: 'Sex',
                                        accessor: 'sex',
                                        resizable: false,
                                        width: Math.round(window.innerWidth * 0.07),
                                        Cell: row => <div style={{ textAlign: "center" }}>{(row.value === 'M') ? 'Male' : 'Female'}</div>
                                    }, {
                                        Header: 'DOB',
                                        accessor: 'dob',
                                        resizable: false,
                                        width: Math.round(window.innerWidth * 0.1),
                                        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                                    }, {
                                        Header: 'Bio',
                                        accessor: 'bio',
                                        resizable: false,
                                        width: Math.round(window.innerWidth * 0.29)
                                    }]
                                    if (actlen !== 0)
                                        return (
                                            <div className='container-fluid' style={{ paddingTop: '1%', paddingBottom: '1%' }}>
                                                <div className='row justify-content-center'>
                                                    <div className='col-sm-3 justify-content-center'>
                                                        <h3>Poster</h3>
                                                        <img style={{
                                                            margin: '0px',
                                                            borderStyle: 'solid',
                                                            borderWidth: '2px',
                                                            borderRadius: '7px',
                                                            maxWidth: '200px',
                                                            maxHeight: '200px'
                                                        }} alt='poster'
                                                            src={bufimg}>
                                                        </img>
                                                    </div>
                                                    <div className='col-sm-8 justify-content-center'>
                                                        <h3>Actors</h3>
                                                        <ReactTable
                                                            data={row.original['act']}
                                                            columns={subcols}
                                                            defaultPageSize={Object.keys(row.original['act']).length}
                                                            showPageSizeOptions={false}
                                                            showPagination={false}
                                                        />
                                                        <button type="button" onClick={() => this.handleShow(row.original)} className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginTop: '3%' }}>
                                                            Edit details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    else
                                        return (
                                            <div className='container-fluid' style={{ paddingTop: '1%', paddingBottom: '1%' }}>
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
                                                            src={bufimg}>
                                                        </img>
                                                        <button type="button" onClick={() => this.handleShow(row.original)} className="btn btn-outline-info btn-sm" data-toggle="modal" data-target="#exampleModalCenter" style={{ marginTop: '3%' }}>
                                                            Edit details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }}
                            />
                            <Modal show={this.state.show} onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit datails</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className='container' style={{ paddingTop: '1%', paddingBottom: '2%' }}>
                                        <div className='row justify-content-center'>
                                            <div className='col-sm-12'>
                                                <h3>Edit details of {this.state.activeName}</h3>
                                                <form>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" id="movnam" placeholder="Movie name" defaultValue={this.state.activeName}></input>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label>Year of release</label>
                                                            <input type="number" className="form-control" id="yor" placeholder="YYYY" defaultValue={this.state.activeYor}></input>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className='form-group col-sm-6'>
                                                            <label>Poster</label>
                                                            <div className="custom-file">
                                                                <input
                                                                    type="file"
                                                                    className="custom-file-input"
                                                                    accept=".jpeg"
                                                                    onChange={this.onChangeHandler}
                                                                />
                                                                <label className="custom-file-label">
                                                                    jpeg files only
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='form-group col-sm-6'>
                                                            <label>Producer</label>
                                                            <Select
                                                                options={pronames}
                                                                value={selectedPro}
                                                                onChange={this.handleProChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='form-row'>
                                                        <div className="form-group col-sm-12">
                                                            <label>Plot</label>
                                                            <textarea type="text" className="form-control" id="plot" defaultValue={this.state.activePlot}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className='form-row'>
                                                        <div className="form-group col-sm-12">
                                                            <label>Actors</label>
                                                            <Select
                                                                options={actnames}
                                                                value={selectedAct}
                                                                isMulti
                                                                isClearable
                                                                onChange={this.handleActChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button type="button" className="btn btn-warning" onClick={this.updmov.bind(this)}>Save changes</button>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
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
                            <button className="btn btn-warning btn-sm" type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showmov.bind(this)}>Movies list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showpro.bind(this)}>Producers list</button>
                        </div>
                        <div className='row justify-content-around' style={{ paddingTop: '1%' }}>
                            <ReactTable
                                className="-striped"
                                data={actlist}
                                columns={actcols}
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
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showact.bind(this)}>Actors list</button>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={this.showmov.bind(this)}>Movies list</button>
                            <button className="btn btn-warning btn-sm" type="button" onClick={this.showpro.bind(this)}>Producers list</button>
                        </div>
                        <div className='row justify-content-around' style={{ paddingTop: '1%' }}>
                            <ReactTable
                                className="-striped"
                                data={prolist}
                                columns={procols}
                                defaultPageSize={prolen < 15 ? prolen : 13}
                                pageSizeOptions={(prolen < 30) ? [15, 20, prolen] : [15, 20, 30, prolen]}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

    componentDidMount() {
        this.getdata()
    }

    getdata() {
        this.setState({ load: 'true'})
        Axios.get(baseurl + 'getmov')
        .then(res => {
            console.log(res.data)
            this.setState({
                movlist: res.data
            })
            Axios.get(baseurl + 'getpro')
                .then(res => {
                    this.setState({
                        prolist: res.data
                    })
                    Axios.get(baseurl + 'getact')
                        .then(res => {
                            this.setState({
                                actlist: res.data,
                                load: 'false'
                            })
                        })
                }
                )
        })
    }

    updmov() {
        var movname = $('#movnam').val()
        if ((movname === null) || (movname === undefined) || (movname === '')) {
            alert('Movie name cant be empty')
            return
        }
        var yor = $('#yor').val()
        if (yor.length !== 4) {
            alert('Enter a vaild year of release in YYYY format')
            return
        }
        const data = new FormData()
        if (this.state.selectedFile === null) {
            data.append('poster', this.state.selectedFileID)
        } else {
            data.append('file', this.state.selectedFile)
        }

        if (this.state.selectedAct === null) {
            alert('Please select the actors')
            return
        } else if (this.state.selectedPro === null) {
            alert('Please select the Producer')
            return
        }

        data.append('_id',this.state.activeID)
        data.append('name', movname)
        data.append('yor', yor)
        data.append('plot', $('#plot').val())
        data.append('prod', this.state.selectedPro['value'])
        data.append('actors', this.state.selectedAct.map(function (item) { return item['value'] }))

        this.setState({ load : 'true' })
        Axios.post(baseurl + 'updmov', data).then(res => {
            if (res.data.msg === 'Success') alert("Successfully updated "+movname)
            else alert("Failed to update")
            this.setState({ selectedAct : null, selectedPro : null, show : false })
        })
        setTimeout(() => {
            this.getdata()
        }, 500);
    }

    onChangeHandler = event => {
        let filnam = event.target.files[0].name
        if ((!filnam.endsWith(".jpg")) && (!filnam.endsWith(".jpeg"))) {
            alert(" Poster must be a jpeg image only")
            return
        }
        $(".custom-file-label").text(event.target.files[0].name)
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleProChange = selectedPro => {
        this.setState({ selectedPro })
    };

    handleActChange = selectedAct => {
        this.setState({ selectedAct })
    };

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
