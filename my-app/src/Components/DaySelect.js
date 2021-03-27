import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function DaySelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    sun: false,
    mon: true,
    tues: true,
    weds: true,
    thur: true,
    fri: true,
    sat: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.onDaysChange({ ...state, [event.target.name]: event.target.checked });
  };

  const { sun, mon, tues, weds, thur, fri, sat } = state;
  const error = [sun, mon, tues, weds, thur, fri, sat ].filter((v) => v).length < 1;

  return (
    <div className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select at least one</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={sun} onChange={handleChange} name="sun" />}
            label="Sunday"
          />
          <FormControlLabel
            control={<Checkbox checked={mon} onChange={handleChange} name="mon" />}
            label="Monday"
          />
          <FormControlLabel
            control={<Checkbox checked={tues} onChange={handleChange} name="tues" />}
            label="Tuesday"
          />
          <FormControlLabel
            control={<Checkbox checked={weds} onChange={handleChange} name="weds" />}
            label="Wednesday"
          />
          <FormControlLabel
            control={<Checkbox checked={thur} onChange={handleChange} name="thur" />}
            label="Thursday"
          />
          <FormControlLabel
            control={<Checkbox checked={fri} onChange={handleChange} name="fri" />}
            label="Friday"
          />
          <FormControlLabel
            control={<Checkbox checked={sat} onChange={handleChange} name="sat" />}
            label="Saturday"
          />
        </FormGroup>
        {/* <FormHelperText component="legend" >Select at least one</FormHelperText> */}
      </FormControl>
    </div>
  );
}