import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select} from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const options = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
]

const allergyOptions = [
    { key: 'f', text: 'Food', value: 'Food' },
    { key: 'm', text: 'Medical', value: 'Medical' },
    { key: 'e', text: 'Environmental', value: 'Environmental' },
    { key: 'o', text: 'Others', value: 'Others' },
]

class EditPatient extends Component {
    state = {
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        houseaddr: '',
        bloodgroup: '',
        allergies: '',
        medication: '',
        emergencyName: '',
        emergencyContact: '',
        loading: false,
        errorMessage: ''
    };

    handleGender = (e, { value }) => this.setState({ gender: value })

    handleAllergies = (e, { value }) => this.setState({ allergies: value })

    onSubmit = async event => {
        event.preventDefault();

        const { ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, emergencyName, emergencyContact } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.editDetails(
                ic, name, phone, gender, dob, height, weight, houseaddr, bloodgroup, allergies, medication, emergencyName, emergencyContact
            ).send({ from: accounts[0] });

            alert("Account created successfully!");
            Router.pushRoute('/list');
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("Account already exists");
        }

        this.setState({ loading: false, ic: '', name: '', phone: '', gender: '', dob: '', height: '', weight: '', houseaddr: '', bloodgroup: '', allergies: '', medication: '', emergencyName: '', emergencyContact: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Create New Stem Cell Record</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>General Information</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                    <Form.Field>
                            <label>Hospital Name</label>
                            <Input
                                placeholder = 'Eg. Sharda Hospital'                
                                value= {this.state.ic}
                                onChange= {event => 
                                    this.setState({ ic: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Hospital Address</label>
                            <Input
                                placeholder = 'Eg. Knowledge Park ,Greater Noida'                        
                                value= {this.state.name}
                                onChange= {event => 
                                    this.setState({ name: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Contact</label>
                            <Input
                                placeholder = 'Eg. 0123456789'
                                value= {this.state.phone}
                                onChange= {event => 
                                    this.setState({ phone: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>              
                    <Form.Group widths='equal'>
                        <Form.Field 
                                label='Gender' 
                                control={Select} 
                                options={options} 
                                onChange={this.handleGender}
                        />

<Form.Field>
                            <label>Stem Cell ID</label>
                            <Input 
                                placeholder = 'Eg. SKIP000001'
                                value= {this.state.dob}
                                onChange= {event => 
                                    this.setState({ dob: event.target.value })}  
                            />
                        </Form.Field>

                       

                        <Form.Field>
                            <label>Stem Cell Name</label>
                            <Input 
                                placeholder = 'Eg. 201B7'
                                label={{ basic: true }}
                                labelPosition='right'
                                value= {this.state.height}
                                onChange= {event => 
                                    this.setState({ height: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Stem Cell Type</label>
                            <Input 
                                placeholder = 'Eg. IPS Cell'
                                label={{ basic: true }}
                                labelPosition='right'
                                value= {this.state.weight}
                                onChange= {event => 
                                    this.setState({ weight: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>                   
                   
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.TextArea
                                label='Ethinicity Of Donor'
                                placeholder = 'Eg. Asian,Latin..'
                                value= {this.state.houseaddr}
                                onChange= {event => 
                                    this.setState({ houseaddr: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Medical History</h2>
                    {/* <Divider clearing />                     */}
                    <Form.Group widths='equal'>
                    <Form.Field>
                            <label>Origin of Source Cell</label>
                            <Input 
                                placeholder = 'Eg. Skin,Blood '
                                value= {this.state.bloodgroup}
                                onChange= {event => 
                                    this.setState({ bloodgroup: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field 
                                label='Data Source' 
                                control={Select} 
                                options={allergyOptions} 
                                onChange={this.handleAllergies}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group widths='equal'>
                    <Form.TextArea
                                label='Provider/Distributor'
                                placeholder = 'Eg. Centre for IPS,Cell research '
                                value= {this.state.medication}
                                onChange= {event => 
                                    this.setState({ medication: event.target.value })}  
                        />
                    </Form.Group>

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Donor Contact</h2>
                    <Divider clearing />
                    <Form.Group widths='equal'>
                       <Form.Field>
                            <label>Donor Name</label>
                            <Input 
                                placeholder = 'Eg. Taylor Smith'
                                value= {this.state.emergencyName}
                                onChange= {event => 
                                    this.setState({ emergencyName: event.target.value })}  
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Donor Contact Phone</label>
                            <Input 
                                placeholder = 'Eg. 0124995002'
                                value= {this.state.emergencyContact}
                                onChange= {event => 
                                    this.setState({ emergencyContact: event.target.value })}  
                            />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Edit</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default EditPatient;