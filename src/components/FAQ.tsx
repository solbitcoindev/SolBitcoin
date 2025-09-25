import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const faqItems = [
    {
      question: 'What is Bitcoin mining?',
      answer: 'Bitcoin mining is the process of creating new bitcoins by solving complex mathematical problems using specialized hardware.'
    },
    {
      question: 'How does mining contribute to the Bitcoin network?',
      answer: 'Mining secures the Bitcoin network and processes transactions. Miners are rewarded with new bitcoins for their work.'
    },
    {
      question: 'What is an ASIC miner?',
      answer: 'An ASIC (Application-Specific Integrated Circuit) miner is a specialized device designed exclusively for mining cryptocurrencies like Bitcoin.'
    },
    {
      question: 'How much electricity does Bitcoin mining consume?',
      answer: 'Bitcoin mining consumes a significant amount of electricity, but it is increasingly using renewable energy sources.'
    },
    {
      question: 'Can I mine Bitcoin at home?',
      answer: 'While it is possible, it is not economically viable for most people due to the high cost of equipment and electricity.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndexes(prevIndexes =>
      prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index)
        : [...prevIndexes, index]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-800 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium">{item.question}</span>
              <motion.span
                animate={{ rotate: openIndexes.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4"
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>
            
            <AnimatePresence>
              {openIndexes.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="bg-gray-800"
                >
                  <div className="p-4 text-gray-300">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
