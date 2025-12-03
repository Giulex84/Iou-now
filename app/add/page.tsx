'use client'; 

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Importazione dal tuo file lib/supabase.ts

export default function AddIOUPage() {
    const [title, setTitle] = useState(''); // Corrisponde alla colonna 'text' (Descrizione)
    const [amount, setAmount] = useState(''); // Corrisponde alla colonna 'amount'
    const [debtor, setDebtor] = useState(''); // Corrisponde alla colonna 'title' (Persona)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToInsert = {
            text: title, // La descrizione (es. Cena, Prestito)
            amount: parseFloat(amount), // Importo numerico
            title: debtor, // La persona coinvolta (Debitore/Creditore)
        };

        const { error } = await supabase
            .from('ious') // Tabella 'ious'
            .insert([dataToInsert]);

        setLoading(false);

        if (error) {
            alert('Errore durante l\'aggiunta dell\'IOU: ' + error.message);
            console.error('Supabase Error:', error);
        } else {
            alert('IOU aggiunto con successo!');
            // Pulizia dei campi dopo il salvataggio
            setTitle('');
            setAmount('');
            setDebtor('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Aggiungi un Nuovo IOU
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                
                {/* Campo Titolo (Descrizione IOU) */}
                <div>
                    <label htmlFor="titolo" className="block text-sm font-medium text-gray-300 mb-2">
                        Titolo (Descrizione)
                    </label>
                    <input
                        id="titolo"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Es. Prestito, Cena, Biglietti..."
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500 transition duration-200"
                        disabled={loading}
                    />
                </div>

                {/* Campo Importo */}
                <div>
                    <label htmlFor="importo" className="block text-sm font-medium text-gray-300 mb-2">
                        Importo (π)
                    </label>
                    <input
                        id="importo"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Es. 20.50 (Usa numeri negativi se devi tu)"
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500 transition duration-200"
                        disabled={loading}
                    />
                </div>

                {/* Campo Debitore/Creditore (Persona) */}
                <div>
                    <label htmlFor="debitore" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome o Persona
                    </label>
                    <input
                        id="debitore"
                        type="text"
                        value={debtor}
                        onChange={(e) => setDebtor(e.target.value)}
                        placeholder="Nome o persona"
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500 transition duration-200"
                        disabled={loading}
                    />
                </div>

                {/* Pulsante di Invio */}
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Aggiunta in corso...' : 'Aggiungi IOU'}
                </button>
            </form>
        </div>
    );
}
