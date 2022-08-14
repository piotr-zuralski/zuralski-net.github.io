BASE_DIR = Dir.getwd
ASSETS_DIR = BASE_DIR + '/_site/assets/'

task :default => [:build, :minify] do
  puts 'Default task'
end


task :build do
  puts 'Building site'
  system 'bundle exec jekyll build --trace --verbose'
end

task :minify do
  require 'uglifier'
  require 'find'

  _uglifierJS = Uglifier.new(:harmony => true)
  Find.find(ASSETS_DIR) do |filename|
    next if filename == '.' or filename == '..'
    if (filename.include? '.js' and !filename.include? '.json') 
      puts filename
      _uglifierJS.compile(File.read(filename))
    end
  end
  
end