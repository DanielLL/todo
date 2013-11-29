class Task < ActiveRecord::Base
  default_scope where(:completed => false)

  def complete
    self.update_attributes(completed: true)
  end
end
