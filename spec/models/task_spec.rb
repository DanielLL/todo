require "spec_helper"



describe "#Task" do
  let!(:task){ FactoryGirl.create(:task)}
  let!(:untitled_task){ FactoryGirl.build(:untitled_task)}

  it "should be valid with a title" do
    task.should be_valid
  end

  it "is invalid without a title" do
    untitled_task.should_not be_valid
  end

end
