import React, {Component} from 'react';
import LiveSearch from "../searchWorkOrder/LiveSearch";
import axios from 'axios';
let screenId;
class ScreenIDList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveScreenIDData: [],
            ScreenID: []
        };
        this.notifyParent = this.notifyParent.bind(this);
    }

    notifyParent = function (name, selectedField) {
        for (let i = 0; i < this.state.liveScreenIDData.length; i++) {
            if (selectedField[0] === this.state.liveScreenIDData[i].name) {
                screenId = this.state.liveScreenIDData[i].id;
            }
        }
        this.props.getSelectedScreenID_Id(screenId);
    };

    componentWillReceiveProps(newProps) {
        if (!!newProps.siteId) {
            axios.post('http://localhost:8081/gclportal/api/screenIDs',
                [newProps.siteId]
            )
                .then((res) => {
                    console.log(res.data);
                    let ScreenID = [];
                    for (let i = 0; i < res.data.length; i++) {
                        ScreenID.push(res.data[i].name);
                    }
                    this.setState({
                        liveScreenIDData: res.data,
                        ScreenID
                    });
                }, (err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="form-inline">
                <label className="col-sm-4 col-form-label" style={styles.label}>ScreenID</label>
                <div className="col-sm-5">
                    <LiveSearch
                        liveSearchData={this.state.ScreenID}
                        notifyParent={this.notifyParent}
                        liveSearchDataResponse="ScreenID"/>
                </div>
            </div>
        );
    }
}

const styles = ({
    label: {
        justifyContent: 'flex-start'
    },
    rowTop: {
        marginTop: '20px'

    },
    text: {
        width:"30%",
        height:"31px"
    },
    col: {
        textAlign: 'start'
    },
    button: {
        justifyContent: 'flex-end',
        marginTop: '25px'
    }
});
export default ScreenIDList;