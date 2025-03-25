import React, { useState } from 'react';
import { X } from 'lucide-react';

const InventoryModal = ({ isOpen, setIsOpen, storyData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const inventory = storyData.inventory;

  if (!isOpen) return null;

  const StatBlock = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
      <span className="font-medium text-jacarta-700 dark:text-white">{label}</span>
      <span className="text-jacarta-500 dark:text-jacarta-300">{value}</span>
    </div>
  );

  const ItemDetails = ({ item }) => {
    return (
      <div className="p-4 bg-white dark:bg-jacarta-700">
        <h3 className="text-lg font-bold mb-4">{item.item_name}</h3>
        <div className="space-y-2">
          <StatBlock label="Category" value={item.category} />
          <StatBlock label="Price" value={`${item.price} gp`} />
          <StatBlock label="Weight" value={`${item.weight} lbs`} />
          <StatBlock label="Quantity" value={item.quantity} />
          
          {item.description && (
            <div>
              <span className="font-medium">Description:</span>
              <p className="text-jacarta-500 dark:text-jacarta-300">{item.description}</p>
            </div>
          )}

          {item.category === 'Weapon' && (
            <>
              <StatBlock label="Damage" value={item.damage_dice} />
              <StatBlock label="Damage Type" value={item.damage_type} />
              <StatBlock label="Range" value={item.range} />
            </>
          )}

          {item.category === 'Armor' && (
            <>
              <StatBlock 
                label="Armor Class" 
                value={`${item.armor_class.base}${item.armor_class.dex_bonus ? ' (+Dex)' : ''}`} 
              />
              {item.str_minimum && <StatBlock label="Min Strength" value={item.str_minimum} />}
              <StatBlock 
                label="Stealth" 
                value={item.stealth_disadvantage ? 'Disadvantage' : 'Normal'} 
              />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="fixed inset-0 bg-jacarta-900 bg-opacity-40 dark:bg-opacity-60 transition-opacity" />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl transform rounded-xl bg-white dark:bg-jacarta-700 shadow-2xl transition-all">
          
          <div className="flex items-center justify-between p-6 border-b border-jacarta-100 dark:border-jacarta-600">
            <h2 className="text-xl font-bold text-jacarta-700 dark:text-white">Inventory</h2>
            <div className='flex gap-4'>
              <p className='text-white'>Gold points: <span className='font-bold'>{storyData.GP}</span></p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-jacarta-500 dark:text-jacarta-300 hover:text-jacarta-700 dark:hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
          </div>
          {
            inventory?(
              <>
          <div className="flex">
            {/* Inventory List */}
            <div className="w-1/3 border-r border-jacarta-100 dark:border-jacarta-600 p-4 overflow-y-auto max-h-[600px]">
              {inventory.map((item, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedItem(item)}
                  className={`p-2 cursor-pointer hover:bg-jacarta-100 dark:hover:bg-jacarta-600 ${selectedItem === item ? 'bg-jacarta-100 dark:bg-jacarta-600' : ''}`}
                >
                  {item.item_name} ({item.quantity})
                </div>
              ))}
            </div>

            {/* Item Details */}
            <div className="w-2/3 p-4">
              {selectedItem ? (
                <ItemDetails item={selectedItem} />
              ) : (
                <p className="text-center text-jacarta-500 dark:text-jacarta-300">
                  Select an item to view details
                </p>
              )}
            </div>
          </div>

          <div className="flex rounded-xl w-[96%] mx-auto mb-3 justify-end gap-3 border-t border-jacarta-100 dark:border-jacarta-600 p-4 bg-jacarta-100 dark:bg-jacarta-600">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 text-white transition-colors font-semibold"
            >
              Close
            </button>
          </div>
              </>
            ):(
              <div className='min-h-16'>
              <p className=' text-xl text-center py-10 dark:text-white'>Create character to access Inventory</p>
              </div>
            )
          }
          

        </div>
      </div>
    </div>
  );
};

export default InventoryModal;