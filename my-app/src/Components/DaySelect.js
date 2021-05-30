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
    margin: theme.spacing(2),
  },
}));

export default function DaySelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Sun: false,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.onDaysChange({ ...state, [event.target.name]: event.target.checked });
  };

  const { Sun, Mon, Tue, Wed, Thu, Fri, Sat } = state;
  const error = [Sun, Mon, Tue, Wed, Thu, Fri, Sat ].filter((v) => v).length < 1;

  return (
    <div className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select at least one</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox color="primary" checked={Sun} onChange={handleChange} name="Sun" />}
            label="Sun"
            labelPlacement="top"
            

          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={Mon} onChange={handleChange} name="Mon" />}
            label="Mon"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={Tue} onChange={handleChange} name="Tue" />}
            label="Tue"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={Wed} onChange={handleChange} name="Wed" />}
            label="Wed"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={Thu} onChange={handleChange} name="Thu" />}
            label="Thu"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={Fri} onChange={handleChange} name="Fri" />}
            label="Fri"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Checkbox color="primary" checked={Sat} onChange={handleChange} name="Sat" />}
            label="Sat"
            labelPlacement="top"
          />
        </FormGroup>
        {/* <FormHelperText component="legend" >Select at least one</FormHelperText> */}
      </FormControl>
    </div>
  );
}