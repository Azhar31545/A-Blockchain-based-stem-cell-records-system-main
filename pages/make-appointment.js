import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';

const statusOptions = [
    { key: 'p', text: 'Pending', value: 'Pending' },
    { key: 'c', text: 'Complete', value: 'Complete' }
]

class MakeAppointment extends Component {
    state = {
        patientaddr: '',
        date: '',
        time: '',
        prescription: '',
        description: '',
        diagnosis: '',
        status: '',
        errorMessage: ''
    };

    handleStatus = (e, { value }) => this.setState({ status: value })

    onSubmit = async event => {
        event.preventDefault();

        const { patientaddr, date, time, diagnosis, prescription, description, status } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setAppointment(
                patientaddr, date, time, diagnosis, prescription, description, status
            ).send({ from: accounts[0] });

            alert("Appointment created successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("An error has occured");
        }

        this.setState({ loading: false, patientaddr: '', date: '', time: '', prescription: '', description: '', diagnosis: '', status: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Enter Details</h1></Segment>
                <Segment>
                <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>General Information</h2>
                <Divider clearing />
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Hospital Ethereum Address</label>
                            <Input
                                placeholder = 'Eg. 0xF6973b46412ff52c1BfDB783D29e5218620Be542'                
                                value= {this.state.patientaddr}
                                onChange= {event => 
                                    this.setState({ patientaddr: event.target.value })}                           
                            />
                        </Form.Field>

                    </Form.Group>

                    <br/> 
                    <Form.Group widths='equal'>
                    <Form.Field>
                            <label>Date</label>
                            <Input
                                placeholder = 'Eg. 10/10/2022'                        
                                value= {this.state.date}
                                onChange= {event => 
                                    this.setState({ date: event.target.value })}                           
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Time</label>
                            <Input
                                placeholder = 'Eg. 10:30am'
                                value= {this.state.time}
                                onChange= {event => 
                                    this.setState({ time: event.target.value })}  
                            />
                        </Form.Field>
                    
                        <Form.Field 
                            label='Status' 
                            control={Select} 
                            options={statusOptions} 
                            onChange={this.handleStatus}
                        />
                    </Form.Group> 

                    <br/>
                    <h2 style={{ marginTop: '20px', marginBottom: '30px'}}>Stem Cell Information</h2>
                    <Divider clearing />             
                    <Form.TextArea
                            label='Data Source'
                            placeholder = 'Eg. SKIP'
                            value= {this.state.prescription}
                            onChange= {event => 
                                this.setState({ prescription: event.target.value })} 
                    />
                    
                    {/* <br/> */}
                    <Form.TextArea
                                label='Stem Cell ID'
                                placeholder = 'Eg. SKIP000000'
                                value= {this.state.diagnosis}
                                onChange= {event => 
                                    this.setState({ diagnosis: event.target.value })}  
                    />             
                    {/* <br/> */}
                    <Form.TextArea
                                label='Stem Cell Name'
                                placeholder = 'Eg. 20TB7'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />      
  <Form.TextArea
                                label='Cell Grade'
                                placeholder = 'Eg. Research Grade'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Produced By'
                                placeholder = 'Eg. Yamanka Singh'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Reference Publication'
                                placeholder = 'Eg. 18035408-23300777'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Gender of Donor'
                                placeholder = 'Eg. Female'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Ethinicity of Donor'
                                placeholder = 'Eg. Caucasian'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Health Status of donor'
                                placeholder = ''
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Source cell type'
                                placeholder = ''
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                      <Form.TextArea
                                label='Organ/tissue of origin of source cell'
                                placeholder = 'Eg. Skin'
                                value= {this.state.description}
                                onChange= {event => 
                                    this.setState({ description: event.target.value })}  
                    />  
                    <br/>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
                </Segment>
            </Layout>
        );
    }
}

export default MakeAppointment;