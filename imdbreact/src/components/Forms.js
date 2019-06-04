import React, { Component } from 'react'
import Spinner from './spinner';
import Axios from 'axios'
import Basic from './Basic'
import $ from 'jquery'
import Select from 'react-select'

const baseurl = Basic.baseurl

export default class Forms extends Component {

    state = {
        load: 'true',
        actlist: '',
        prolist: '',
        selectedFile: null,
        selectedPro: null,
        selectedAct: null
    }

    render() {

        const { load } = this.state
        const { selectedPro } = this.state
        const { selectedAct } = this.state

        if (load === 'true') {
            return <Spinner />
        }

        else {
            var pronames = this.state.prolist.map(function (nam) {
                return { label: nam['name'], value: nam['_id'] }
            })
            var actnames = this.state.actlist.map(function (nam) {
                return { label: nam['name'], value: nam['_id'] }
            })
            return (
                <div className='container' style={{ paddingTop: '1%', paddingBottom: '2%' }}>
                    <div className='row justify-content-center'>
                        <div className='col-sm-12'>
                            <h3>Add new movie</h3>
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input type="text" className="form-control" id="movnam" placeholder="Movie name"></input>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Year of release</label>
                                        <input type="number" className="form-control" id="yor" placeholder="YYYY"></input>
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
                                        <textarea type="text" className="form-control" id="plot"></textarea>
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
                                <button type="button" className="btn btn-warning" onClick={this.addmov.bind(this)}>Add movie</button>
                            </form>
                        </div>
                    </div>
                    <div className='row justify-content-between' style={{ paddingTop: '3%' }}>
                        <div className='col-sm-5'>
                            <h4>Add new producer</h4>
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input type="text" className="form-control" id="pronam" placeholder="Producer name"></input>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Sex</label>
                                        <input type="text" className="form-control" id="prosex" placeholder="M / F"></input>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className="form-group col-md-6">
                                        <label>DOB</label>
                                        <input type="text" className="form-control" id="prodob" placeholder="DD/MM/YYYY"></input>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Bio</label>
                                        <input type="text" className="form-control" id="probio"></input>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-warning" onClick={this.addpro.bind(this)}>Add producer</button>
                            </form>
                        </div>
                        <div className='col-sm-5'>
                            <h4>Add new actor</h4>
                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input type="text" className="form-control" id="actnam" placeholder="Actor name"></input>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Sex</label>
                                        <input type="text" className="form-control" id="actsex" placeholder="M / F"></input>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className="form-group col-md-6">
                                        <label>DOB</label>
                                        <input type="text" className="form-control" id="actdob" placeholder="DD/MM/YYYY"></input>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Bio</label>
                                        <input type="text" className="form-control" id="actbio"></input>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-warning" onClick={this.addact.bind(this)}>Add actor</button>
                            </form> </div>
                    </div>
                </div >
            )
        }
    }

    componentDidMount() {
        this.setState({ load: 'true' })
        Axios.get(baseurl + 'getact')
            .then(res => {
                this.setState({
                    actlist: res.data
                })
                Axios.get(baseurl + 'getpro')
                    .then(res => {
                        this.setState({
                            prolist: res.data,
                            load: 'false'
                        })
                    })
            })
    }

    addmov() {
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
            alert('Please upload a poster')
            return
        } else if (this.state.selectedAct === null) {
            alert('Please select the actors')
            return
        } else if (this.state.selectedPro === null) {
            alert('Please select the Producer')
            return
        }

        data.append('file', this.state.selectedFile)
        data.append('name', movname)
        data.append('yor', yor)
        data.append('plot', $('#plot').val())
        data.append('prod', this.state.selectedPro['value'])
        data.append('actors', this.state.selectedAct.map(function (item) { return item['value'] }))

        this.setState({ load : 'true' })
        Axios.post(baseurl + 'addmov', data).then(res => {
            if (res.data.msg === 'Success') alert("Successfully added "+movname)
            else alert("Redundant movie")
            this.setState({ load : 'false', selectedAct : null, selectedPro : null })
        })
    }

    addpro() {
        var pronam = $('#pronam').val()
        var prodob = $('#prodob').val()
        var prosex = $('#prosex').val()
        console.log(prodob.length)
        if (pronam.length < 1) {
            alert('Name of the producer cant be empty')
            return
        } else if (prodob.length !== 10) {
            alert('Enter a valid DOB in DD/MM/YYYY format')
            return
        } else if ((prosex !== 'M') && (prosex !== 'F')) {
            alert('Enter valid sex ( \'M\' or \'F\' )')
            return
        }
        var probio = $('#probio').val()

        Axios.post(baseurl + 'addpro', {
            name: pronam,
            dob: prodob,
            sex: prosex,
            bio: probio
        }).then(res => {
            if (res.data.msg === 'Success') alert("Successfully added "+pronam)
            else alert("Redundant producer")
            this.setState({ load: 'true' })
            Axios.get(baseurl + 'getpro')
                .then(res => {
                    this.setState({
                        prolist: res.data,
                        load: 'false'
                    })
                })
        })
    }

    addact() {
        var actnam = $('#actnam').val()
        var actdob = $('#actdob').val()
        var actsex = $('#actsex').val()
        console.log(actdob.length)
        if (actnam.length < 1) {
            alert('Name of the actor cant be empty')
            return
        } else if (actdob.length !== 10) {
            alert('Enter a valid DOB in DD/MM/YYYY format')
            return
        } else if ((actsex !== 'M') && (actsex !== 'F')) {
            alert('Enter valid sex ( \'M\' or \'F\' )')
            return
        }
        var actbio = $('#actbio').val()

        Axios.post(baseurl + 'addact', {
            name: actnam,
            dob: actdob,
            sex: actsex,
            bio: actbio
        }).then(res => {
            if (res.data.msg === 'Success') alert("Successfully added " + actnam)
            else alert("Redundant actor")
            this.setState({ load: 'true' })
            Axios.get(baseurl + 'getact')
                .then(res => {
                    this.setState({
                        actlist: res.data,
                        load: 'false'
                    })
                })
        })
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

}
