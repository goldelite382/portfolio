import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ name }) => (<div>
		{name}
	</div>
)

Tab.propTypes = {
	name : PropTypes.string.isRequired
};

export default Tab;


