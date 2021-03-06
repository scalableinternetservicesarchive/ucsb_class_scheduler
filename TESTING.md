# Local testing

With a working database you are now ready to start local testing. Before testing, run 
```
yarn install
```
Then open two terminal consoles. 

To start the backend server, run the following in the main directory
```
rails start -p 3001
```
Change directory to the client folder, then run the following to start the frontend
```
yarn start
```
This command should open the website in your browser, if not, go to localhost:3000

# Deploying to AWS with Elastic Beanstalk

When you want to do deploy master or a branch to AWS follow these instructions.

First download the .pem file from [Piazza](https://piazza.com/class/j789lo09yai5qx).  

Rename the .pem file to
```
ucsb-class-scheduler.pem
```
From the directory where the .pem file resides, SSH into the following linux server
```
ssh -i ucsb-class-scheduler.pem ucsb-class-scheduler@ec2.cs291.com
```
Go to the project's directory
```
cd ucsb_class_scheduler/
```
Update the repository
```
git pull
```
Select the branch you want to launch the instance from
```
git checkout <desired_branch>
```

To deploy the instance, run
```
eb create -db.engine postgres -db.i db.t2.micro -db.user u --envvars SECRET_KEY_BASE=<random_secret> --single ucsb-class-scheduler-<your_name>
```
* Replace <your_name> with your name  
* Replace <random_secret>  with the string generated by running ```rake secret``` 
* ucsb-class-scheduler-<your_name> corresponds to the environment name in the AWS online console
* If you need to change the database size or server specs, check out [this](https://github.com/scalableinternetservices/demo_rails514_beanstalk#create-a-deployment-for-load-testing).

When done testing, terminate the instance by running
```
eb terminate
```

# Load testing with Tsung

By load testing we can detect how the website's key performance metrics, like response times and error rates, are affected by different implementations and strategies. This is done by simulating real users using the site. The tests should include both reads and write operations.  

To start load testing, first deploy an instance by following the instructions in the previous section. 

Then launch Tsung on a stack using CloudFormation from [here](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new
).
Use this [template](https://cs291.s3.amazonaws.com/Tsung.json).

When the stack launch completes, go [here](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks), select the newly created stack and look at it's Outputs tab to find the command to SSH into it. 

It will look like this, run it
```
ssh -i ucsb-class-scheduler.pem ec2-user@xx.xx.xx.xx
```
To run a Tsung test you need first need to create a xml file, my_test.xml, defining what the simulated users should do. 

After creating this file, run it with
```
tsung -f my_test.xml -k start
```
To see how the test is progressing and results of it, simply go to the url specified by the xx.xx.xx.xx part of the SSH command. 
You can also find it directly in the output tab of the stack right below the SSH command. 

After the test is done, the log files will only be available while the stack is active.

Copy the log files for later review and comparison by opening another terminal in the directory where the .pem file resides. 

Then run
```
rsync -auvLe 'ssh -i ucsb-class-scheduler.pem' ec2-user@xx.xx.xx.xx:tsung_logs .
```
The log files will then be copied to this directory.  

Close the SSH connection by running 
```
exit
```
Finally, don't forget to terminate the stack on [AWS](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks).
