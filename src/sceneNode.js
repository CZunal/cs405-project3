/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Get the transformation matrix from the TRS object
        const transformationMatrix = this.trs.getTransformationMatrix();
    
        // Compute the transformed matrices by combining the parent's matrices with this node's transformation matrix
        const transformedModelMatrix = MatrixMult(modelMatrix, transformationMatrix);
        const transformedModelView = MatrixMult(modelView, transformationMatrix);
        const transformedNormals = MatrixMult(normalMatrix, transformationMatrix); // May need normal matrix adjustment
        const transformedMvp = MatrixMult(mvp, transformationMatrix);
    
        // Draw the MeshDrawer for the current node
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModelMatrix);
        }
    
        // Recursively draw all child nodes
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModelMatrix);
        }
    }
        
}