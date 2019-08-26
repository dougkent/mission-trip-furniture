// React
import React from 'react';

// Material
import Chip from '@material-ui/core/Chip';

//MTF
import { SelectedMaterial } from '../../models/selected-material';

class MaterialsSelectorComponent extends React.Component {

    private sampleMaterialData: SelectedMaterial[] = [
        {
            id: "1",
            name: "2x4",
        },
        {
            id: "2",
            name: "2x6",
        }
    ];

    handleDelete = (selectedMaterial: SelectedMaterial): void => {
        // TODO Handle Delete
        console.log(selectedMaterial);
    }

    render() {
        return (
            <div>
                <h3>Materials Needed</h3>
                {this.sampleMaterialData.map(selectedMaterial => {
                    return (
                        <Chip key={selectedMaterial.id}
                            label={selectedMaterial.name}
                            onDelete={() => this.handleDelete(selectedMaterial)}
                        />
                    )
                })}
            </div>
        )
    }
}

export default MaterialsSelectorComponent;