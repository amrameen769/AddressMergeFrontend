import React, {Component} from "react";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import {IconButton, InputAdornment} from "@material-ui/core";
import {DateTimePicker} from "@material-ui/pickers";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";

export default class DateAndTimeAdv extends Component {
    constructor(props) {
        super(props);
        if (props.selectedDate === "") {
            this.state = {
                selectedDate: new Date()
            };
        } else {
            this.state = {
                selectedDate: props.selectedDate
            };
        }
    }

    onDateChange(dateValue) {
        this.setState({selectedDate: dateValue});
        this.props.onDateChange(dateValue);
    }

    render() {
        let {selectedDate} = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    autoOk
                    disableFuture
                    hideTabs
                    inputVariant="outlined"
                    ampm={false}
                    value={selectedDate}
                    onChange={this.onDateChange.bind(this)}
                    allowKeyboardControl={false}
                    minDate={new Date("2018-01-01")}
                    leftArrowIcon={<AlarmIcon/>}
                    leftArrowButtonProps={{"aria-label": "Prev month"}}
                    rightArrowButtonProps={{"aria-label": "Next month"}}
                    rightArrowIcon={<SnoozeIcon/>}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <AlarmIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </MuiPickersUtilsProvider>
        );
    }
}
