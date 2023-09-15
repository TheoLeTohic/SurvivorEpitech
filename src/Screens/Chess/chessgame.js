import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Chess} from 'chess.js';
import { set } from '@firebase/database';

const boardSize = 8;
const pieces = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙',
};

export default function ChessGame({ }) {
  const [userTurn, setUserTurn] = useState("White");
  const [game] = useState(new Chess());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);

  const getBoardFromGame = () => {
    const fen = game.fen().split(' ')[0];
    return fen.split('/').map(row => {
      let expandedRow = '';
      for (let char of row) {
        if (isNaN(parseInt(char))) {
          expandedRow += char;
        } else {
          expandedRow += '.'.repeat(parseInt(char));
        }
      }
      return expandedRow.split('');
    });
  };

  const [board, setBoard] = useState(getBoardFromGame());

  const handleCellPress = (rowIndex, cellIndex) => {
    const algebraicPosition = `${String.fromCharCode(97 + cellIndex)}${8 - rowIndex}`;
    try {
      if (selectedSquare) {
        const move = game.move({ from: selectedSquare, to: algebraicPosition });
        if (move) {
          setBoard(getBoardFromGame());
          setSelectedSquare(null);
          if (userTurn == "White") {
            setUserTurn("Black");
          } else {
            setUserTurn("White");
          }
          error != null && setError(null);
        } else {
          setSelectedSquare(algebraicPosition);
        }
      } else {
        setSelectedSquare(algebraicPosition);
      }
    } catch (error) {
      setError(error.message);
      setSelectedSquare(null);
    }

    if (game.isCheckmate()) {
      const winner = game.turn() === 'w' ? 'Black' : 'White';
      setWinner(winner);
      setGameOver(true);
      return;
    }
  };

  return (
    <View style={styles.board}>
      {gameOver && <Text style={{marginBottom: 50, fontSize: 20}}>{winner + " Wins"}</Text>}
      <Text style={{marginBottom: 50, fontSize: 20}}>{userTurn + " Turn"}</Text>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <TouchableOpacity
              key={cellIndex}
              style={[styles.cell, (rowIndex + cellIndex) % 2 === 0 ? styles.light : styles.dark]}
              onPress={() => handleCellPress(rowIndex, cellIndex)}>
              <Text style={styles.piece}>{pieces[cell]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {error != null && <Text>{error}</Text>}
      {selectedSquare != null && <Text style={null}>{selectedSquare}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 45,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: '#E5E5E5',
  },
  dark: {
    backgroundColor: '#767676',
  },
  piece: {
    fontSize: 24,
  },
});