import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { containsProfanity, censorText } from '../utils/contentFilter';

interface FilteredInputProps extends Omit<TextInputProps, 'onChangeText'> {
  label?: string;
  /** Called with the raw (unfiltered) text on every keystroke */
  onChangeText?: (raw: string) => void;
  /** Called with filter result — use this to block submission */
  onFilterResult?: (isClean: boolean, censored: string) => void;
}

/**
 * A drop-in replacement for TextInput that runs the obscenity
 * profanity filter on every keystroke and shows inline feedback.
 */
export default function FilteredInput({
  label,
  onChangeText,
  onFilterResult,
  style,
  ...rest
}: FilteredInputProps) {
  const [value, setValue] = useState('');
  const [isClean, setIsClean] = useState(true);

  const handleChange = (text: string) => {
    setValue(text);
    const clean = !containsProfanity(text);
    setIsClean(clean);
    onChangeText?.(text);
    onFilterResult?.(clean, censorText(text));
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.row}>
        <TextInput
          {...rest}
          value={value}
          onChangeText={handleChange}
          style={[styles.input, !isClean && styles.inputDirty, style]}
          placeholderTextColor="#999"
        />
        {/* Colour dot — green = clean, red = flagged */}
        <View style={[styles.dot, isClean ? styles.dotClean : styles.dotDirty]} />
      </View>

      {!isClean ? (
        <Text style={styles.msgError}>
          ⚠️  Inappropriate content detected — will be censored on submit
        </Text>
      ) : value.length > 0 ? (
        <Text style={styles.msgOk}>✓  Looks good!</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#d0d5dd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1a1a2e',
  },
  inputDirty: {
    borderColor: '#e53e3e',
    backgroundColor: '#fff5f5',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotClean: { backgroundColor: '#38a169' },
  dotDirty: { backgroundColor: '#e53e3e' },
  msgError: { fontSize: 12, color: '#e53e3e', marginTop: 4 },
  msgOk: { fontSize: 12, color: '#38a169', marginTop: 4 },
});
