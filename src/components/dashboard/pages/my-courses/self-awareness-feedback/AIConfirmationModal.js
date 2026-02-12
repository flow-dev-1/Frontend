import React from 'react';
import { Icon } from '@iconify/react';

const AIConfirmationModal = ({ isOpen, onClose, onConfirm, weekNumber }) => {
    if (!isOpen) return null;

    return (
        <div className="ai-modal-overlay">
            <div className="ai-modal-content">
                <div className="ai-modal-header">
                    <div className="ai-modal-icon">
                        <Icon icon="solar:magic-stick-3-bold-duotone" />
                    </div>
                    <h3>Generate AI Feedback</h3>
                    <button className="ai-modal-close" onClick={onClose}>
                        <Icon icon="material-symbols:close" />
                    </button>
                </div>

                <div className="ai-modal-body">
                    <p>
                        Are you sure you want to generate automated feedback for <strong>Week {weekNumber}</strong> using AI?
                    </p>
                    <p className="ai-modal-note">
                        This will analyze the student's progress and generate a comprehensive summary.
                    </p>
                </div>

                <div className="ai-modal-footer">
                    <button className="ai-btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="ai-btn-primary" onClick={onConfirm}>
                        Yes, Generate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIConfirmationModal;
