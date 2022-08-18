require "rubygems"
require "bundler/setup"
require "find"

JEKYLL_DESTINATION = ENV["JEKYLL_DESTINATION"] = File.expand_path(ENV.fetch("JEKYLL_DESTINATION", "./_site")) + "/"
ASSETS_DIR = "#{ENV["JEKYLL_DESTINATION"]}assets/"

JEKYLL_ENV = ENV["JEKYLL_ENV"] = ENV.fetch("JEKYLL_ENV", "development")
ENV["GITHUB_TOKEN"] = ENV.fetch("GITHUB_TOKEN", nil)
ENV["JEKYLL_GITHUB_TOKEN"] = ENV.fetch("JEKYLL_GITHUB_TOKEN", ENV.fetch("GITHUB_TOKEN", nil))
ENV["OCTOKIT_ACCESS_TOKEN"] = ENV.fetch("OCTOKIT_ACCESS_TOKEN", ENV.fetch("JEKYLL_GITHUB_TOKEN", nil))

task :clean do
  puts "Cleaning..."
  FileUtils.rm_rf(JEKYLL_DESTINATION)
end

task :default => [:build, :minify, :generate_version] do
  puts "Default task"
end

task :build => [:clean] do
  puts "Building site"
  puts "JEKYLL_ENV: #{JEKYLL_ENV}"
  puts "JEKYLL_DESTINATION: #{JEKYLL_DESTINATION}"
  
  if JEKYLL_ENV == "production" and (ENV["JEKYLL_GITHUB_TOKEN"] == nil or ENV["JEKYLL_GITHUB_TOKEN"] == "") then
    abort "Please set the JEKYLL_GITHUB_TOKEN environment variable"
  end

  system("bundle exec jekyll build --trace --verbose --destination #{JEKYLL_DESTINATION}")
end

task :minify do
  system("yarn install")

  Find.find(ASSETS_DIR) do |filename|
    next if filename == "." or filename == ".."

    if (filename.include? ".js" and !filename.include? ".json")
      puts "Minifying JS - " + filename
      system("yarn run uglifyjs -- #{filename} --output #{filename} --config-file config.uglifyjs.json")

    elsif filename.include? ".css"
      puts "Minifying CSS - " + filename
      system("yarn run csso --input #{filename} --output #{filename}")
    end
  end
end

task :generate_version do
  revision = `git rev-parse --verify HEAD`.strip
  revisionShort = `git rev-parse --short HEAD`.strip
  branch = `git rev-parse --abbrev-ref HEAD`.strip

  version = branch + "@" + revisionShort

  File.write(JEKYLL_DESTINATION + "revision", revision)
  File.write(JEKYLL_DESTINATION + "version.txt", version)

  puts "Generated version: #{version}"
end

task :post_build => [:minify, :generate_version]