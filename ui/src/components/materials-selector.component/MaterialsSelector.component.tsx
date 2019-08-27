// React
import React from 'react';

//AWS
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Connect from 'aws-amplify-react';
import aws_exports from './aws-exports';

// Material
import Chip from '@material-ui/core/Chip';

// React Select
import Select from 'react-select';

//MTF
import { SelectedMaterial } from '../../models/selected-material';
import { listMaterials } from '../../graphql/queries';
import { ListMaterialsQuery } from '../../services/API';

//Configure
Amplify.configure(aws_exports);

export interface Material {
  id: string;
  name: string;
}

class MaterialsSelectorComponent extends React.Component {
  state: { selectedMaterials: Material[]; materials: Material[] } = {
    selectedMaterials: [],
    materials: [],
  };

  // handleChange = (selectedMaterial: Material) => {
  //     const selectedMaterials = this.state.selectedMaterials;
  //     selectedMaterials.push(selectedMaterial);

  //     this.setState({ selectedMaterials });

  //     console.log(`Option selected:`, selectedMaterial, 'Options selected: ', selectedMaterials);
  // };

  // handleDelete = (selectedMaterial: Material) => {
  //     let selectedMaterials = this.state.selectedMaterials;
  //     selectedMaterials = selectedMaterials.filter((material) => material.id != selectedMaterial.id);

  //     this.setState({ selectedMaterials });

  //     console.log(selectedMaterial);
  // }

  // onInputChange = (newValue: string) => {
  //     // TODO: Handle Input change
  //     console.log('InputChange', newValue);
  // }

  render() {
    return (
      <div>
        <h3>Materials Needed</h3>
        <Connect query={graphqlOperation(listMaterials)}>
          {({
            data,
            loading,
          }: {
            data: ListMaterialsQuery;
            loading: boolean;
          }) => {
            if (data.listMaterials) {
              this.setState({ materials: data.listMaterials.items });
            }

            <Select
              closeMenuOnSelect={false}
              isMulti
              name='selectedMaterials'
              isLoading={loading}
              options={this.state.materials}
            />;
          }}
        </Connect>
        {/* {this.sampleMaterialData.map(selectedMaterial => {
                    return (
                        <Chip key={selectedMaterial.id}
                            label={selectedMaterial.name}
                            onDelete={() => this.handleDelete(selectedMaterial)}
                        />
                    )
                })} */}
      </div>
    );
  }
}

export default MaterialsSelectorComponent;
