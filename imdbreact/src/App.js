import React, { Component } from 'react'
import Disp from './components/Disp';
import Forms from './components/Forms';

export default class App extends Component {

  state = {
    forms: 'false'
  }

  render() {
    const {forms} = this.state
    if(forms === 'true'){
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{ borderBottomLeftRadius: '11px', borderBottomRightRadius: '11px' }}>
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            </div>
            <div className="mx-auto order-0">
              <a className="navbar-brand mx-auto" href="/">
                Imdb mini
            </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <button className="btn btn-light btn-sm" type="button" onClick={this.formoff.bind(this)}>Close input forms</button>
                </li>
              </ul>
            </div>
          </nav>

          <Forms/>
        </React.Fragment>
      )
    }

    else if(forms === 'false') {
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{ borderBottomLeftRadius: '11px', borderBottomRightRadius: '11px' }}>
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            </div>
            <div className="mx-auto order-0">
              <a className="navbar-brand mx-auto" href="/">
                Imdb mini
            </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" type="button" onClick={this.formon.bind(this)}>Show input forms</button>
                </li>
              </ul>
            </div>
          </nav>

          <Disp />

        </React.Fragment>
      )
    }

  }

  formon() {
    this.setState({ forms : 'true'})
  }

  formoff() {
    this.setState({ forms : 'false'})
  }
}
