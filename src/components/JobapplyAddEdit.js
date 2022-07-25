import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Spinner,
    Label,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select from 'react-select';
import { Base64 } from 'js-base64';
import defaultavatar from '../../assets/images/avatar-blue.png';
import './styles.css';
import { API_BASE_URL } from '../../services/hostSetting';
import FileUploader from '../../components/FileUploader';

const baseUrl = API_BASE_URL;
const catergoryOptions = [
    {
        status: true,
        _id: '619ca1118f1d132ce319466f',
        name: 'AWS Engineer',
        created_by: '619b71002ed4085cc0c52619',
        createdAt: '2021-11-23T08:06:41.217Z',
        updatedAt: '2021-11-23T08:28:56.548Z',
        __v: 0,
        updated_by: '619b71002ed4085cc0c52619',
        deleted: false,
    },
];

class JobapplyAddEdit extends React.Component {
    state = {
        uid: null,
        uname: null,
        phone: null,
        idpan: null,
        etc: null,
        ctc: null,
        notice: null,
        recruiter: null,
        selectedLead: null,
        isLoading: false,
        email: null,
        initresume: [],
        resume: [],
    };

    toggleModal = () => {
        this.props.closeAddEditModal();
    };

    componentDidMount = () => {
        if (this.props.toggleAddEditModal) {
            if (this.props.data !== null) {
                this.setState({
                    uid: this.props.data.candidate.sl_no,
                    uname: this.props.data.candidate.name,
                    phone: this.props.data.candidate.phone,
                    idpan: this.props.data.candidate.id_or_pan_no,
                    ctc: this.props.data.ctc,
                    etc: this.props.data.etc,
                    email: this.props.data.candidate.email,
                    notice: this.props.data.notice_period,
                });

                this.handleRecruiterChange(
                    this.convertRecruiter(this.props.recruiter).filter(
                        (item) => item.value === this.props.data.recruiter._id
                    )
                );
                if (this.props.data.candidate.resume) {
                    this.setState({
                        initresume: this.props.data.candidate.resume,
                    });
                }
            }
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.jobapply && this.props.jobapply.jobapplyAdd) {
            if (prevProps.jobapply.jobapplyAdd !== this.props.jobapply.jobapplyAdd) {
                this.props.getJobapplyList();
                this.toggleModal();
            }
        }
        if (this.props.jobapply && this.props.jobapply.jobapplyUpdate) {
            if (prevProps.jobapply.jobapplyUpdate !== this.props.jobapply.jobapplyUpdate) {
                this.props.getJobapplyList();

                this.toggleModal();
            }
        }
    }

    addJobapply() {
        if (
            this.state.jid !== '' &&
            this.state.category !== '' &&
            this.state.payment !== '' &&
            this.state.title !== '' &&
            this.state.company !== '' &&
            this.state.desc !== '' &&
            this.state.tags !== '' &&
            this.state.jid !== null &&
            this.state.category !== null &&
            this.state.payment !== null &&
            this.state.title !== null &&
            this.state.company !== null &&
            this.state.desc !== null &&
            this.state.tags !== null
        ) {
            let formData = new FormData();
            let data = {
                jobapply_id: this.state.jid,
                category: this.state.category.value,
                payment_terms: this.state.payment,
                title: this.state.title,
                company: this.state.company,
                tags: this.state.tags,
                description: this.state.desc,
            };

            this.props.getJobapplyAdd(data);
        } else {
            this.props.emptyAllFields('Please Fill all the fields');
        }
    }

    updateJobapply = () => {
        if (
            this.state.uid !== '' &&
            this.state.uname !== '' &&
            this.state.phone !== '' &&
            this.state.idpan !== '' &&
            this.state.email !== '' &&
            this.state.etc !== '' &&
            this.state.ctc !== '' &&
            this.state.notice !== '' &&
            this.state.recruiter !== '' &&
            this.state.uid !== '' &&
            this.state.uname !== null &&
            this.state.phone !== null &&
            this.state.email !== null &&
            this.state.idpan !== null &&
            this.state.etc !== null &&
            this.state.ctc !== null &&
            this.state.notice !== null &&
            this.state.recruiter !== null &&
            this.state.resume.length > 0
        ) {
            let formData = new FormData();
            formData.append('job_id', this.props.data._id);
            formData.append('sl_no', this.state.uid);
            formData.append('email', this.state.email);
            formData.append('name', this.state.uname);
            formData.append('phone', this.state.phone);
            formData.append('id_or_pan_no', this.state.idpan);
            formData.append('etc', this.state.etc);
            formData.append('ctc', this.state.ctc);
            formData.append('notice_period', this.state.notice);
            formData.append('recruiter', this.state.recruiter[0].value);
            if (this.state.resume.length > 0) {
                for (let i = 0; i < this.state.resume.length; i++) {
                    formData.append('resume', this.state.resume[i]);
                }
            }

            this.props.getJobapplyUpdate(formData);
        } else {
            this.props.emptyAllFields('Please Fill all the fields');
        }
    };

    handleImageChange = (image) => {
        this.setState({ image_file: image.target.files[0] });
        this.setState(
            (image = {
                profileimage: URL.createObjectURL(image.target.files[0]),
            })
        );
    };
    convertRecruiter = (data) => {
        var categroyData = [];
        data &&
            data.forEach((value) => {
                categroyData.push({
                    label: (
                        <div>
                            <img
                                className="avatar-sm rounded-circle mr-2"
                                style={{ objectFit: 'cover' }}
                                src={value.avatar ? baseUrl + value.avatar : defaultavatar}
                            />
                            {value.firstName}{' '}
                        </div>
                    ),
                    value: value._id,
                });
            });
        return categroyData;
    };
    handleRecruiterChange = (recruiter) => {
        this.setState({ recruiter: recruiter });
    };
    handleFileupload = (e) => {
        this.setState({ resume: e });
    };
    handleDelete = () => {
        this.setState({ initresume: [] });
    };

    render() {
        const { uid, uname, phone, idpan, email, etc, ctc, notice, recruiter, resume, initresume } = this.state;

        const { data } = this.props;
        return (
            <React.Fragment>
                <Card className="dept-details-card">
                    <CardBody>
                        <Modal
                            isOpen={this.props.toggleAddEditModal}
                            toggle={this.toggleModal}
                            className="modal-dialog-centered"
                            size="lg">
                            <ModalHeader toggle={this.toggleModal} className="modal-colored-header bg-dark">
                                {data !== null ? 'Edit Jobapply' : 'Add New Jobapply'}
                            </ModalHeader>
                            <ModalBody>
                                {/* {this.props.employee && this.props.employee.employeelistloading && this.props.jobapply && this.props.jobapply.listloading && <LoaderWidget />} */}
                                <AvForm>
                                    <Row>
                                        <Col md={6}>
                                            <AvField
                                                name="userid"
                                                label="SL Number"
                                                disabled={true}
                                                type="text"
                                                value={uid || ''}
                                                onChange={(e) => {
                                                    this.setState({ uid: e.target.value });
                                                }}
                                                required
                                                placeholder="SL Number"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="username"
                                                label="Username"
                                                type="text"
                                                value={uname || ''}
                                                onChange={(e) => {
                                                    this.setState({ uname: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Username"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="phone"
                                                label="Phonenumber"
                                                type="tel"
                                                value={phone || ''}
                                                onChange={(e) => {
                                                    this.setState({ phone: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Phone Number"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="email"
                                                label="Email ID"
                                                type="email"
                                                value={email || ''}
                                                onChange={(e) => {
                                                    this.setState({ email: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Email ID"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="idpan"
                                                label="ID / PAN Number"
                                                type="text"
                                                value={idpan || ''}
                                                onChange={(e) => {
                                                    this.setState({ idpan: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter ID/PAN Number"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="etc"
                                                label="ETC"
                                                type="number"
                                                value={etc || ''}
                                                onChange={(e) => {
                                                    this.setState({ etc: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter ETC"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="ctc"
                                                label="CTC"
                                                type="number"
                                                value={ctc || ''}
                                                onChange={(e) => {
                                                    this.setState({ ctc: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter CTC"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <AvField
                                                name="notice"
                                                label="Notice Period (in months)"
                                                type="number"
                                                value={notice || ''}
                                                onChange={(e) => {
                                                    this.setState({ notice: e.target.value });
                                                }}
                                                required
                                                placeholder="Enter Notice Period"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Label>Recruiter</Label>
                                            <Select
                                                isSearchable={true}
                                                isClearable={true}
                                                onChange={(e) => {
                                                    this.handleRecruiterChange(e);
                                                }}
                                                defaultValue={recruiter || ''}
                                                placeholder="Select Recruiter"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                options={this.convertRecruiter(this.props.recruiter)}></Select>
                                        </Col>
                                        <Col md={12}>
                                            {initresume.length == 0 && (
                                                <>
                                                    <Label for="fileuploader">Upload Resume</Label>
                                                    <FileUploader
                                                        id="fileuploader"
                                                        onFileUpload={(files) => this.handleFileupload(files)}
                                                    />
                                                </>
                                            )}
                                        </Col>
                                        <Col md={12}>
                                            {initresume.length !== 0 && (
                                                <>
                                                    <Label for="fileuploader">Resume</Label>
                                                    <Card>
                                                        <CardBody>
                                                            <Row>
                                                                <Col className="col-auto">
                                                                    <div className="avatar-sm">
                                                                        <span className="avatar-title bg-primary rounded">
                                                                            {initresume.split('.')[1]}
                                                                        </span>
                                                                    </div>
                                                                </Col>
                                                                <Col className="pl-0">
                                                                    <a
                                                                        href={baseUrl + initresume}
                                                                        target="_blank"
                                                                        className="text-muted font-weight-bold">
                                                                        {initresume}
                                                                    </a>
                                                                </Col>
                                                                <Col className="text-right">
                                                                    <i
                                                                        style={{ cursor: 'pointer' }}
                                                                        className="mdi mdi-close widget-icon bg-danger-lighten text-danger hover-scale-lg"
                                                                        onClick={() => this.handleDelete()}></i>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </AvForm>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={this.toggleModal}>
                                    Cancel
                                </Button>
                                {data !== null ? (
                                    <Button color="success" onClick={() => this.updateJobapply()}>
                                        Update Jobapply
                                    </Button>
                                ) : (
                                    <>
                                        {/* <Button color="success" disabled>
                                            <Spinner className="spinner-border-sm mr-1" tag="span" color="white" />
                                            Loading...
                                        </Button> */}
                                        <Button color="success" onClick={() => this.addJobapply()}>
                                            Add Jobapply
                                        </Button>
                                    </>
                                )}
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default JobapplyAddEdit;
