const main = async () => {
    const FeedbackContract = await hre.ethers.getContractFactory('Feedback');
    const feedbackContract = await FeedbackContract.deploy();
    await feedbackContract.deployed();
    console.log("Contract deployed to:", feedbackContract.address);
  
    const money = {value: hre.ethers.utils.parseEther("10")};
    //user accounts
    const [owner, tipper, tipper2, tipper3 , tipper4 ] = await hre.ethers.getSigners();
  
    
  
    await feedbackContract.connect(tipper).sendFeedback('awesome app chief',"Ezeogo");
    await feedbackContract.connect(tipper2).sendFeedback('nice',"Clinton");
    await feedbackContract.connect(tipper3).sendFeedback('Danke',"sin");
    await feedbackContract.connect(tipper4).sendFeedback('Obrigado',"Jesse");
  
    let feedbackArray = await feedbackContract.returnFeedbacks();
  
    await feedbackContract.connect(tipper).payMeEth(money);
    await feedbackContract.connect(tipper2).payMeEth(money);
    await feedbackContract.connect(tipper3).payMeEth(money);
    await feedbackContract.connect(tipper4).payMeEth(money);
  
    for (let i = 0; i < feedbackArray.length; i++) {
        console.log(feedbackArray[i])
    }
    console.log("As per??")
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();