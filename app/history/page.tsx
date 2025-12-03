'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase'; // Importazione dal tuo file lib/supabase.ts

// Componente per una singola card IOU
const IOUCard = ({ iou, onDelete }) => {
    // Le colonne sono: amount, text (descrizione), title (persona)
    const isCredit = iou.amount >= 0; 
    
    const amountColor = isCredit ? 'text-green-400' : 'text-red-400';
    const borderColor = isCredit ? 'border-green-600' : 'border-red-600';
    
    const displayAmount = isCredit ? `+${iou.amount}` : `${iou.amount}`;
    
    // Formattazione semplice della data (rimuove l'ora)
    const formattedDate = iou.created_at ? new Date(iou.created_at).toLocaleDateString() : 'N/D';
    
    const handleElimina = () => {
        if (confirm(`Sei sicuro di voler eliminare l'IOU: ${iou.text}?`)) {
            onDelete(iou.id);
        }
    };

    return (
        <div className={`flex justify-between items-center p-5 my-3 bg-gray-800 rounded-xl shadow-xl transition duration-200 border-l-4 ${borderColor}`}>
            {/* Dettagli IOU */}
            <div className='flex flex-col'>
                <p className="text-xl font-semibold text-white truncate max-w-[200px]">
                    {iou.text} 
                </p>
                <p className={`text-3xl font-extrabold ${amountColor} my-1`}>
                    {displayAmount} π
                </p>
                <p className="text-sm text-gray-400">
                    {isCredit ? `Devi ricevere da: ${iou.title}` : `Devi dare a: ${iou.title}`} | {formattedDate}
                </p>
            </div>
            
            {/* Pulsante Elimina */}
            <button
                onClick={handleElimina}
                className="text-red-500 border border-red-500 hover:bg-red-600 hover:text-white font-medium py-2 px-4 rounded-lg transition duration-150 flex items-center space-x-1"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                <span>Elimina</span>
            </button>
        </div>
    );
};

export default function HistoryPage() {
    const [ious, setIous] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIous = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('ious')
            .select('*')
            .order('created_at', { ascending: false }); // Ordina per data più recente

        if (error) {
            console.error('Errore nel recupero dati Supabase:', error);
        } else {
            setIous(data);
        }
        setLoading(false);
    }, []);

    const handleDelete = async (id) => {
        const { error } = await supabase
            .from('ious')
            .delete()
            .eq('id', id); // Assume che 'id' sia la Primary Key

        if (error) {
            alert('Errore nella cancellazione dell\'IOU: ' + error.message);
            console.error('Supabase Delete Error:', error);
        } else {
            // Aggiorna l'elenco rimuovendo l'elemento cancellato
            setIous((prevIous) => prevIous.filter((iou) => iou.id !== id));
        }
    };

    useEffect(() => {
        fetchIous();
    }, [fetchIous]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
                Storico IOU
            </h1>

            {loading ? (
                <p className="text-center text-gray-400 mt-10">Caricamento IOU...</p>
            ) : ious.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Nessun IOU presente.</p>
            ) : (
                <div className="max-w-2xl mx-auto">
                    {ious.map((iou) => (
                        <IOUCard key={iou.id} iou={iou} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
