import React, { createContext, useContext, useEffect, useState } from 'react';
import { getNotes, saveNotes } from '../services/storageService';

const NotesContext = createContext();
