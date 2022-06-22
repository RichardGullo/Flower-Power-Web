
function About() {

    return (
        <div class="columns-container">
            <div style={styles.columnSection}>
                <div class="top-background-container"></div>
                <div style={styles.columnContent}>
                    <h1>Your Next Generation Tool <br /> for Garden Management</h1>
                    <h2>Flower power helps put control of the garden back into your hands. No green thumb? No worries!</h2>
                    <h2><span class="text-bold">Track</span> your plant's growth and recieve automated reminders for important care tasks. Log important data about your plants such as its nickname, species, classification, water and sunlight requirements, and store custom notes.</h2>
                    <h2><span class="text-bold">Search</span> through your stored plant files to pull up information on any plant in your garden on demand. Add, edit, and delete entries as your garden grows.</h2>
                    <h2><span class="text-bold">Explore</span> nearby plant nurseries to find the perfect new addition to your garden!</h2>
                </div>
                <div class="bottom-background-container"></div>
            </div>

        </div>



    );



}

const styles={
    columnSection:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        position: 'relative',
        zIndex: 100
    },

    columnContent:{
        textAlign:'center',
        width:'1000px',
    }
}

export default About;