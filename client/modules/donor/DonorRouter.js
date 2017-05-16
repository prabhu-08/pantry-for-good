import React from 'react'
import {Route} from 'react-router-dom'

import DonorList from './components/DonorList'
import DonorView from './components/DonorView'
import DonorEdit from './components/DonorEdit'
import DonorCreate from './components/DonorCreate'
import ClientCreateSuccess from '../../components/ClientCreateSuccess'
import requireRole from '../../components/router/requireRole'
import ownerOrAdmin from '../../components/router/ownerOrAdmin'
import SwitchWithNotFound from '../../components/router/SwitchWithNotFound'

import './donor.css'

const IsAdmin = requireRole(['admin'])
const IsDonor = requireRole(['donor', 'admin'])
const Owns = ownerOrAdmin('donorId')

const DonorRouter = ({match}) =>
  <SwitchWithNotFound>
    <Route path={match.url} exact component={IsAdmin(DonorList)} />
    <Route
      path={`${match.url}/create/success`}
      exact
      component={IsDonor(ClientCreateSuccess)}
    />
    <Route
      path={`${match.url}/create`}
      exact
      component={IsDonor(DonorCreate)}
    />
    <Route
      path={`${match.url}/:donorId/edit`}
      exact
      component={Owns(DonorEdit)}
    />
    <Route
      path={`${match.url}/:donorId`}
      exact
      component={Owns(DonorView)} />
  </SwitchWithNotFound>

export default DonorRouter
