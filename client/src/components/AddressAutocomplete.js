// @flow

import React from 'react';
import { InputGroup, Input } from 'reactstrap';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import { classnames } from 'helpers/utils';

type Props = {
    handleAddressError: (val: string) => {},
    handleCoordinatesChange: (val: { lat: number, lng: number }) => {},
    handleAddressChange: (val: string) => {},
    value: string
};

const AddressAutocomplete = ({
    handleAddressError,
    handleCoordinatesChange,
    handleAddressChange,
    value
}: Props) => {
    const handleSelect = (address: string) => {
        geocodeByAddress(address)
                .then(res => getLatLng(res[0]))
                .then(({ lat, lng }) => {
                    return handleCoordinatesChange({ lat, lng });
                })
                .catch(e => {
                    handleAddressError('Address is not valid');
                });
    };

    const handleChange = (address: string) => {
        handleAddressChange(address);
    };

    const handleError = (status: string, clearSuggestions: () => {}) => {
        clearSuggestions();
    };

    const handleBlur = onBlur => {
        onBlur();
        handleSelect(value);
    };

    return (
        <PlacesAutocomplete
            onError={handleError}
            value={value}
            onChange={handleChange}
            onSelect={handleSelect}
            shouldFetchSuggestions={value ? value.length > 2 : false}
        >
            {({ getInputProps, getSuggestionItemProps, suggestions }) => {
                const inputProps = getInputProps();

                return (
                    <React.Fragment>
                        <InputGroup>
                            <Input
                                {...inputProps}
                                onBlur={handleBlur.bind(
                                    null,
                                    inputProps.onBlur
                                )}
                            />
                        </InputGroup>
                        <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                                const className = classnames(
                                    'autocomplete-suggestion-item',
                                    {
                                        'autocomplete-suggestion-item--active':
                                            suggestion.active
                                    }
                                );

                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className
                                        })}
                                    >
                                        <strong>
                                            {
                                                suggestion.formattedSuggestion
                                                        .mainText
                                            }
                                        </strong>{' '}
                                        <small>
                                            {
                                                suggestion.formattedSuggestion
                                                        .secondaryText
                                            }
                                        </small>
                                    </div>
                                );
                            })}
                        </div>
                    </React.Fragment>
                );
            }}
        </PlacesAutocomplete>
    );
};

export default AddressAutocomplete;
