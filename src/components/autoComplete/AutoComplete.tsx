// Autocomplete.tsx
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface AutocompleteProps {
  suggestions: string[];
}

const AutocompleteContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li<{ isSelected: boolean }>`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected ? '#f0f0f0' : 'transparent'};
`;

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredSuggestions(suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    ));
  }, [inputValue, suggestions]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex(prevIndex => {
        if (prevIndex === null || prevIndex === filteredSuggestions.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex(prevIndex => {
        if (prevIndex === null || prevIndex === 0) {
          return filteredSuggestions.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    } else if (event.key === 'Enter') {
      if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
        setInputValue(filteredSuggestions[selectedIndex]);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <AutocompleteContainer ref={inputRef}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionsList>
          {filteredSuggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              isSelected={selectedIndex === index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteContainer>
  );
};

export default Autocomplete;
