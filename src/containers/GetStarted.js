import React from 'react';
import Container from "@material-ui/core/Container";
// import bg_home from './images/bg_home.jpg';

const GetStarted = () => {
    const para = (
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus porta accumsan. Donec ac
            molestie sapien. Donec lobortis, risus et ullamcorper lobortis, nunc sem venenatis odio, feugiat
            dignissim orci sapien eu nulla. Praesent mattis neque nibh, nec ultrices metus tempor eget. Aliquam
            magna massa, interdum in tellus vitae, varius finibus magna. Quisque feugiat odio porta quam
            tristique, fringilla interdum justo consectetur. Morbi ac est ex. Quisque in orci blandit, blandit
            nisl nec, luctus eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Ut nisl diam, vestibulum sed malesuada vel, posuere eget nulla.

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi
            non faucibus ipsum, ac efficitur nisl. Etiam sodales mattis odio ac convallis. Etiam et neque
            sollicitudin, consectetur diam et, egestas ligula. Aliquam sodales a diam ac venenatis. Vivamus eu
            pulvinar eros, vel sagittis est. Aliquam vestibulum eu lectus non rhoncus. Phasellus non placerat
            nisi. Quisque tempus congue ante eget sollicitudin. Suspendisse potenti. Mauris a semper dolor. Nunc
            congue diam vel placerat aliquam. Phasellus ac posuere ipsum. Ut id fermentum ligula. Sed nec
            malesuada diam. In velit libero, dignissim a lacus quis, rhoncus ullamcorper nisl.

            Etiam dignissim fermentum nibh, a ullamcorper quam malesuada ut. Duis ac massa dolor. Phasellus quis
            nunc ullamcorper, commodo arcu sit amet, commodo augue. Etiam et urna id nisl molestie pharetra et
            ut arcu. Donec sollicitudin, metus quis faucibus imperdiet, enim nibh porttitor turpis, id congue
            neque tellus id augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Curabitur luctus rhoncus tristique. Curabitur tincidunt semper est ut luctus. Mauris
            non risus auctor, suscipit magna et, maximus risus. Phasellus non purus dui.

            Donec vitae metus in augue fringilla viverra at id libero. Donec pretium, lorem ac cursus euismod,
            lectus justo malesuada ligula, sit amet fringilla elit velit id augue. Praesent vestibulum, arcu et
            molestie cursus, nisi metus sollicitudin lacus, nec maximus nisi odio quis risus. Phasellus leo
            elit, euismod eget diam scelerisque, posuere fermentum sem. Sed iaculis est neque, quis rutrum quam
            bibendum sit amet. Curabitur aliquam hendrerit metus quis cursus. Ut luctus in elit eget hendrerit.
            Curabitur lobortis tellus et sem consequat volutpat. Nunc consequat lobortis nulla, eget commodo
            lacus tempor non. Proin sapien metus, scelerisque nec sapien pretium, rutrum volutpat nisl. Morbi
            pharetra dui at enim tristique, sit amet rutrum odio varius. Orci varius natoque penatibus et magnis
            dis parturient montes, nascetur ridiculus mus. Pellentesque ac mauris in sapien rhoncus interdum et
            eu sem. Nulla quis tempus nibh. Cras in turpis erat. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae;

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In vitae
            posuere augue. Ut sodales pellentesque posuere. Aliquam id egestas leo. Suspendisse potenti. Mauris
            placerat diam vel ex ultrices varius. Donec dictum purus nisl. Donec laoreet semper mi eu fermentum.
            Duis id finibus quam. Aenean non lectus pharetra, aliquam lectus in, gravida ipsum. Vivamus ac
            tincidunt lacus. Pellentesque vel dictum felis. Nam sollicitudin ac est in congue. Aenean tempus
            lacinia dapibus. Maecenas egestas mauris a nisl consequat faucibus. Cras pulvinar ex sit amet
            interdum consectetur.</p>
    );
    return (
        // <div style={{backgroundImage: `url(${bg_home})`}}>
            <div>
                <Container>
                    <h1>Get Started</h1>
                    {para}
                    {para}
                    {para}
                    {para}
                </Container>
            </div>
        // </div>
    );
};

export default GetStarted;